export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  variants?: { name: string; value: string }[];
}
