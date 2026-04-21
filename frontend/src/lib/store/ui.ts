"use client";

import { create } from "zustand";

type UiState = {
  toast: string | null;
  cartDrawerOpen: boolean;
  setToast: (message: string | null) => void;
  setCartDrawerOpen: (open: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  toast: null,
  cartDrawerOpen: false,
  setToast: (toast) => set({ toast }),
  setCartDrawerOpen: (cartDrawerOpen) => set({ cartDrawerOpen }),
}));
