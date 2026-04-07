export interface IHomeResponse {
  slider: ISlider;
  catalog: ICatalog[];
}

export interface ISlider {
  gallery: string[];
  gallery_for_mobile: string[];
  ialoveni_slider: string[];
  ialoveni_slider_mobile: string[];
}

export interface ICatalog {
  id: number;
  name: string;
  slug: string;
  has_children: boolean;
  children: ICatalogChild[];
}

export interface ICatalogChild {
  id: number;
  name: string;
  slug: string;
  image: null | string;
  products: IProduct[];
}

export interface IProduct {
  id: number;
  title: string;
  slug: string;
  permalink: string;
  image: string;
  description: string;
  sku: string;
  regular_price: string;
  sale_price: null | string;
  is_on_sale: boolean;
  has_options: boolean;
}
