export interface CartItemOption {
  label: string;
  value: string;
  price?: number;
  count?: number;
}

export interface CartItem {
  id: number;
  title: string;
  image: string;
  basePrice: number;
  qty: number;
  options?: { label: string; value: string }[];
  additions?: CartItemOption[];
  sauces?: CartItemOption[];
  comment?: string;
}
