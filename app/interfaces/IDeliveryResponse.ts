export interface IDeliveryItem {
  title: string;
  description: string;
  description_Ialoveni: string;
}

export interface IDeliveryResponse {
  image: string | false;
  items: IDeliveryItem[];
}
