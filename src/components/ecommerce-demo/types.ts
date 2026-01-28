export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface ProductVariant {
  name: string;
  value: string;
  hex?: string; // dla swatchów koloru
}

export interface AccordionItem {
  title: string;
  content: string;
}

export interface ValueProp {
  label: string;
  icon: "quality" | "eco" | "craft" | "curated";
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  /** Cena przed obniżką (przekreślona) */
  compareAtPrice?: number;
  description?: string;
  /** Np. "Nowość", "Bestseller" */
  badge?: string;
  rating?: number;
  reviewCount?: number;
  variants?: ProductVariant[];
  /** Dostawa – np. "Wysyłka w 2 dni robocze" */
  deliveryInfo?: string;
  giftWrapAvailable?: boolean;
  accordion?: AccordionItem[];
  valueProps?: ValueProp[];
}
