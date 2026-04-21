"use client";

import { create } from "zustand";
import type { CartResponse } from "@/lib/api/contracts/cart";

type CartState = {
  items: CartResponse["items"];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  setFromResponse: (cart: CartResponse) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  subtotal: 0,
  shipping: 0,
  tax: 0,
  total: 0,
  setFromResponse: (cart) =>
    set({
      items: cart.items,
      subtotal: cart.subtotal,
      shipping: cart.shipping,
      tax: cart.tax,
      total: cart.total,
    }),
  clear: () => set({ items: [], subtotal: 0, shipping: 0, tax: 0, total: 0 }),
}));
