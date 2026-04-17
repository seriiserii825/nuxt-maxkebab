import { z } from "zod";

// ── Validation schema ────────────────────────────────────────────────────────

const cartItemSchema = z.object({
  id: z.number(),
  uid: z.string(),
  title: z.string(),
  image: z.string().optional().default(""),
  basePrice: z.number(),
  qty: z.number().min(1),
  options: z.array(z.object({ label: z.string(), value: z.string() })).optional().default([]),
  additions: z.array(z.object({ label: z.string(), price: z.number().optional().default(0), group: z.string().optional().default("") })).optional().default([]),
  sauces: z.array(z.object({ label: z.string(), price: z.number().optional().default(0), count: z.number().optional(), group: z.string().optional().default("") })).optional().default([]),
  comment: z.string().optional().default(""),
});

const schema = z.object({
  firstName:   z.string().min(1),
  lastName:    z.string().min(1),
  phone:       z.string().min(1),
  email:       z.string().email().optional().default(""),
  city:        z.string().min(1),          // "Chișinău" | "Ialoveni"
  citySlug:    z.string().min(1),          // "chisinau" | "ialoveni"
  shipping:    z.enum(["pickup", "delivery"]),
  street:      z.string().optional().default(""),
  number:      z.string().optional().default(""),
  apartment:   z.string().optional().default(""),
  officeType:  z.string().optional().default(""),
  staircase:   z.string().optional().default(""),
  floor:       z.string().optional().default(""),
  interphone:  z.string().optional().default(""),
  sector:      z.string().optional().default(""),
  payment:     z.enum(["cod", "maib"]),
  notes:       z.string().optional().default(""),
  items:       z.array(cartItemSchema).min(1),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    throw createError({ statusCode: 422, message: `${issue?.path.join(".")}: ${issue?.message}` });
  }

  const d = parsed.data;
  const woo = useWooFetch();

  // ── 1. Build address ────────────────────────────────────────────────────────
  const stateMap: Record<string, string> = { chisinau: "C", ialoveni: "IL" };
  const addressParts = d.shipping === "delivery"
    ? [d.street, d.number, d.apartment, d.officeType, d.sector].filter(Boolean).join(", ")
    : "";
  const address2Parts = [d.staircase && `sc.${d.staircase}`, d.floor && `et.${d.floor}`, d.interphone && `int.${d.interphone}`]
    .filter(Boolean).join(", ");

  const billing = {
    first_name: d.firstName,
    last_name:  d.lastName,
    address_1:  addressParts || d.city,
    address_2:  address2Parts,
    city:       d.city,
    state:      stateMap[d.citySlug] ?? "",
    postcode:   "",
    country:    "MD",
    email:      d.email,
    phone:      d.phone,
  };

  // ── 2. Build line items ─────────────────────────────────────────────────────
  const lineItems = d.items.map((item) => {
    const extrasTotal =
      (item.additions?.reduce((s, a) => s + (a.price ?? 0), 0) ?? 0) +
      (item.sauces?.reduce((s, a) => s + (a.price ?? 0), 0) ?? 0);
    const unitPrice = item.basePrice + extrasTotal;
    const lineTotal = (unitPrice * item.qty).toFixed(2);

    const meta_data: Array<{ key: string; value: string }> = [];

    item.options?.forEach((o) => {
      if (o.value) meta_data.push({ key: o.label, value: o.value });
    });
    let lastAddGroup = "";
    item.additions?.forEach((a) => {
      if (!a.label) return;
      const g = a.group ?? "";
      if (g && g !== lastAddGroup) {
        meta_data.push({ key: `##${g}`, value: g });
        lastAddGroup = g;
      }
      meta_data.push({ key: a.label, value: a.price ? `+${a.price} Lei` : "+" });
    });
    let lastSauceGroup = "";
    item.sauces?.forEach((s) => {
      if (!s.label) return;
      const g = s.group ?? "";
      if (g && g !== lastSauceGroup) {
        meta_data.push({ key: `##${g}`, value: g });
        lastSauceGroup = g;
      }
      const val = [s.count && `x${s.count}`, s.price && `+${s.price} Lei`].filter(Boolean).join(" ");
      meta_data.push({ key: s.label, value: val || "+" });
    });
    if (item.comment) meta_data.push({ key: "Comentariu", value: item.comment });

    return {
      product_id: item.id,
      quantity:   item.qty,
      subtotal:   lineTotal,
      total:      lineTotal,
      ...(meta_data.length ? { meta_data } : {}),
    };
  });

  // ── 3. Build order note ─────────────────────────────────────────────────────
  const shippingLabel = d.shipping === "pickup" ? "Ridicare comandă" : `Livrare la ${d.city}`;
  const noteLines = [shippingLabel, d.notes].filter(Boolean).join("\n");

  // ── 4. Create WooCommerce order ─────────────────────────────────────────────
  let order: { id: number };
  try {
    order = await woo.post<{ id: number }>("/orders", {
      billing,
      shipping:             billing,
      payment_method:       d.payment,
      payment_method_title: d.payment === "cod" ? "Numerar" : "Achită Online (MAIB)",
      set_paid:             false,
      customer_note:        noteLines,
      line_items:           lineItems,
    });
  } catch (err) {
    const e = err as { data?: { message?: string }; message?: string; status?: number };
    throw createError({ statusCode: e?.status ?? 500, message: e?.data?.message ?? e?.message ?? "Failed to create order" });
  }

  // ── 5. Send emails (non-blocking) ───────────────────────────────────────────
  sendOrderEmails({ orderId: order.id, data: d, billing }).catch((e: unknown) =>
    console.error("[checkout] email error:", (e as Error)?.message),
  );

  return { order_id: order.id };
});

// ── Email helper ─────────────────────────────────────────────────────────────

async function sendOrderEmails(opts: {
  orderId: number;
  data: z.infer<typeof schema>;
  billing: Record<string, string>;
}) {
  const { orderId, data: d, billing } = opts;
  const config = useRuntimeConfig();
  const mailer = useMailer();

  const itemsHtml = d.items
    .map((item) => {
      const extrasTotal =
        (item.additions?.reduce((s, a) => s + (a.price ?? 0), 0) ?? 0) +
        (item.sauces?.reduce((s, a) => s + (a.price ?? 0), 0) ?? 0);
      const lineTotal = ((item.basePrice + extrasTotal) * item.qty).toFixed(2);

      function groupedRows<T extends { group?: string }>(
        items: T[],
        row: (item: T) => string,
      ) {
        const lines: string[] = [];
        let lastGroup = "";
        for (const item of items) {
          const g = item.group ?? "";
          if (g && g !== lastGroup) {
            lines.push(`<div style="font-size:11px;color:#374151;font-weight:700;padding-left:8px;margin-top:4px;">${g}:</div>`);
            lastGroup = g;
          }
          lines.push(row(item));
        }
        return lines;
      }

      const extraLines = [
        ...(item.options?.map((o) => `<div style="font-size:12px;color:#6b7280;padding-left:8px;">↳ <strong>${o.label}:</strong> ${o.value}</div>`) ?? []),
        ...groupedRows(item.additions ?? [], (a) => `<div style="font-size:12px;color:#6b7280;padding-left:16px;">+ ${a.label}: <strong>+${a.price} Lei</strong></div>`),
        ...groupedRows(item.sauces ?? [], (s) => `<div style="font-size:12px;color:#6b7280;padding-left:16px;">${s.label}${s.count ? ` x${s.count}` : ""}: <strong>+${s.price} Lei</strong></div>`),
        ...(item.comment ? [`<div style="font-size:12px;color:#6b7280;padding-left:8px;margin-top:4px;">↳ Comentariu: <strong>${item.comment}</strong></div>`] : []),
      ].join("");

      return `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;">
          <div style="font-size:14px;color:#374151;">${item.title} <span style="color:#9ca3af">× ${item.qty}</span></div>
          ${extraLines}
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:14px;color:#374151;text-align:right;vertical-align:top;">${lineTotal} Lei</td>
      </tr>`;
    })
    .join("");

  const addressText = d.shipping === "delivery"
    ? [billing.address_1, billing.address_2, d.city].filter(Boolean).join(", ")
    : `Ridicare comandă — ${d.city}`;

  function html(title: string, subtitle: string) {
    return `<!DOCTYPE html>
<html lang="ro">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08);">
        <tr>
          <td style="background:#d53729;padding:28px 40px;">
            <h1 style="margin:0;color:#fff;font-size:20px;font-weight:700;">${title}</h1>
            <p style="margin:6px 0 0;color:#f9b9b5;font-size:13px;">${subtitle}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 40px 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 14px;background:#f9fafb;border-radius:6px;border-left:3px solid #d53729;">
                  <p style="margin:0 0 2px;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:.8px;">Client</p>
                  <p style="margin:0;font-size:15px;color:#111827;font-weight:600;">${billing.first_name} ${billing.last_name}</p>
                  <p style="margin:2px 0 0;font-size:13px;color:#6b7280;">${billing.phone}${billing.email ? ` · ${billing.email}` : ""}</p>
                </td>
              </tr>
              <tr><td style="padding-top:12px;">
                <p style="margin:0 0 2px;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:.8px;">Livrare</p>
                <p style="margin:0;font-size:14px;color:#374151;">${addressText}</p>
              </td></tr>
              <tr><td style="padding-top:12px;">
                <p style="margin:0 0 2px;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:.8px;">Plată</p>
                <p style="margin:0;font-size:14px;color:#374151;">${d.payment === "cod" ? "Numerar la destinație" : "Online (Visa/Mastercard)"}</p>
              </td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 40px 0;">
            <p style="margin:0 0 12px;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:.8px;">Produse</p>
            <table width="100%" cellpadding="0" cellspacing="0">${itemsHtml}</table>
          </td>
        </tr>
        ${d.notes ? `<tr><td style="padding:16px 40px 0;">
          <p style="margin:0 0 4px;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:.8px;">Note</p>
          <p style="margin:0;font-size:14px;color:#374151;">${d.notes}</p>
        </td></tr>` : ""}
        <tr>
          <td style="padding:24px 40px;border-top:1px solid #f3f4f6;margin-top:20px;">
            <p style="margin:0;font-size:12px;color:#9ca3af;">Max Kebab · Comanda #${orderId}</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
  }

  const promises = [
    mailer.sendMail({
      from:    `"Max Kebab" <${config.smtpFrom}>`,
      to:      config.smtpTo as string,
      subject: `Comandă nouă #${orderId} — ${billing.first_name} ${billing.last_name}`,
      html:    html(`Comandă nouă #${orderId}`, `Plasată de ${billing.first_name} ${billing.last_name}`),
    }),
  ];

  if (billing.email) {
    promises.push(
      mailer.sendMail({
        from:    `"Max Kebab" <${config.smtpFrom}>`,
        to:      billing.email,
        subject: `Confirmare comandă #${orderId} — Max Kebab`,
        html:    html(`Mulțumim pentru comandă!`, `Comanda ta #${orderId} a fost primită și este în procesare.`),
      }),
    );
  }

  await Promise.all(promises);
}
