export default defineEventHandler(async (event): Promise<IWooProduct> => {
  const { slug, locale } = getQuery(event) as { slug: string; locale: string };
  const woo = useWooFetch(locale);

  if (!slug) {
    throw createError({ statusCode: 400, message: "slug query parameter is required" });
  }

  try {
    const { data: products } = await woo.getRaw<IWooProduct[]>("/products", { slug });

    if (!products.length) {
      throw createError({ statusCode: 404, message: "Product not found" });
    }

    return products[0];
  } catch (err) {
    const e = err as { statusCode?: number; status?: number; message?: string };
    throw createError({ statusCode: e?.statusCode ?? e?.status ?? 500, message: e?.message });
  }
});
