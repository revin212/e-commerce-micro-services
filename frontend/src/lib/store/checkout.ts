"use client";

import { create } from "zustand";

type CheckoutState = {
  step: number;
  address: string;
  shippingMethodId: string;
  payment: string;
  billingSameAsShipping: boolean;
  setStep: (step: number) => void;
  setField: (field: "address" | "shippingMethodId" | "payment", value: string) => void;
  setBillingSameAsShipping: (value: boolean) => void;
};

export const useCheckoutStore = create<CheckoutState>((set) => ({
  step: 2,
  address: "",
  shippingMethodId: "standard",
  payment: "",
  billingSameAsShipping: true,
  setStep: (step) => set({ step }),
  setField: (field, value) => set({ [field]: value } as Partial<CheckoutState>),
  setBillingSameAsShipping: (billingSameAsShipping) => set({ billingSameAsShipping }),
}));
