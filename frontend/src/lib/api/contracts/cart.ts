export type CartItem = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
};

export type UpsertCartRequest = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
};

export type CartResponse = {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};
