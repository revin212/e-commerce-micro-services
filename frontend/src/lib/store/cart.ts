"use client";

import { create } from "zustand";

type CartItem = { id: string; name: string; price: number; quantity: number };

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, "quantity">) => void;
  remove: (id: string) => void;
  updateQty: (id: string, quantity: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  add: (item) =>
    set((state) => {
      const existing = state.items.find((it) => it.id === item.id);
      if (existing) {
        return {
          items: state.items.map((it) =>
            it.id === item.id ? { ...it, quantity: it.quantity + 1 } : it,
          ),
        };
      }
      return { items: [...state.items, { ...item, quantity: 1 }] };
    }),
  remove: (id) => set((state) => ({ items: state.items.filter((it) => it.id !== id) })),
  updateQty: (id, quantity) =>
    set((state) => ({
      items: state.items.map((it) => (it.id === id ? { ...it, quantity } : it)),
    })),
  clear: () => set({ items: [] }),
}));
