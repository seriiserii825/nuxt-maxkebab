export interface IWooProduct {
  id: number;
  sku: string;
  name: string;
  slug: string;
  type: "simple" | "variable";
  status: string;
  description: string;
  short_description: string;
  regular_price: string;
  sale_price: string;
  stock_status: string;
  stock_quantity: number | null;
  categories: Array<{ id: number; name: string; slug: string }>;
  images: Array<{ id: number; src: string; alt: string }>;
  attributes: Array<{ id: number; name: string; options: string[]; variation: boolean }>;
  variations: number[];
  meta_data: Array<{ key: string; value: string }>;
}
