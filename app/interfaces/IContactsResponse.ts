export interface ISocialLink {
  immagine: string;
  url: string;
}

export interface IContactsResponse {
  company_name: string;
  phone_chisinau: string;
  phone_ialoveni: string;
  email: string;
  address_chisinau: string;
  address_ialoveni: string;
  opening_times: string;
  map_chisinau: string;
  map_ialoveni: string;
  social_links: ISocialLink[];
}
