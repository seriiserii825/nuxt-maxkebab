interface WooVariation {
  id: number;
  price: string;
  regular_price: string;
  sale_price: string;
  stock_status: "instock" | "outofstock" | "onbackorder";
  stock_quantity: number | null;
  attributes: Array<{ id: number; name: string; option: string }>;
  image: { src: string } | null;
}

export interface IProductVariation {
  id: number;
  price: string;
  regular_price: string;
  sale_price: string;
  stock_status: "instock" | "outofstock" | "onbackorder";
  stock_quantity: number | null;
  attributes: Record<string, string>;
  image: string;
}

export default defineEventHandler(async (event): Promise<IProductVariation[]> => {
  const woo = useWooFetch();
  const { product_id } = getQuery(event) as { product_id?: string };

  if (!product_id) {
    throw createError({ statusCode: 400, message: "product_id query parameter is required" });
  }

  try {
    const { data: variations } = await woo.getRaw<WooVariation[]>(
      `/products/${product_id}/variations`,
      { per_page: "100" },
    );

    return variations.map((v) => ({
      id: v.id,
      price: v.price,
      regular_price: v.regular_price,
      sale_price: v.sale_price,
      stock_status: v.stock_status,
      stock_quantity: v.stock_quantity,
      attributes: Object.fromEntries(v.attributes.map((a) => [a.name, a.option])),
      image: v.image?.src ?? "",
    }));
  } catch (err) {
    const e = err as { statusCode?: number; status?: number; message?: string };
    throw createError({ statusCode: e?.statusCode ?? e?.status ?? 500, message: e?.message });
  }
});
