export interface IAddonOption {
  label: string;
  price: number;
  image: string;
}

export interface IAddonField {
  id: number;
  label: string;
  /** Field types from Product Extras for WooCommerce (pewc) plugin */
  type:
    | "text"
    | "textarea"
    | "number"
    | "date"
    | "select"
    | "select-box"
    | "radio"
    | "checkbox"
    | "checkbox-group"
    | "image-swatch"
    | "color-picker"
    | "upload"
    | "name-price"
    | "products"
    | "calculation"
    | "information"
    | string;
  required: boolean;
  description: string;
  price: number;
  percentage: number;
  min: string;
  max: string;
  options: IAddonOption[];
}

export interface IAddonGroup {
  id: number;
  title: string;
  description: string;
  fields: IAddonField[];
}

export default defineEventHandler(async (event): Promise<IAddonGroup[]> => {
  const { product_id, locale } = getQuery(event) as { product_id?: string; locale?: string };

  if (!product_id) {
    throw createError({ statusCode: 400, message: "product_id is required" });
  }

  const wp = useWpFetch(event, locale);

  try {
    return await wp.get<IAddonGroup[]>("/custom/v1/product-addons", { product_id });
  } catch (err) {
    const e = err as { statusCode?: number; status?: number; message?: string };
    throw createError({ statusCode: e?.statusCode ?? e?.status ?? 500, message: e?.message });
  }
});
