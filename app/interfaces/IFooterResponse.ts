export interface IFooterResponse {
  footer: IFooterData;
}

export interface IFooterData {
  full_company_name_ro: string;
  full_company_name_ru: string;
  full_company_name_en: string;
  opening_times_ro: string;
  opening_times_ru: string;
  opening_times_en: string;
  full_address_ro: string;
  full_address_ru: string;
  full_address_en: string;
  full_address_chisinau: string;
  phone_number_chisinau: string;
  map_chisinau: string;
  full_address_ialoveni: string;
  phone_number_ialoveni: string;
  map_ialoveni: string;
  info_delivery_ro: string;
  info_delivery_ru: string;
  info_delivery_en: string;
  email: string;
  social_links: ISocialLink[];
  parnter_logo: string;
  partner_url: string;
}

export interface ISocialLink {
  immagine: string;
  url: string;
}
