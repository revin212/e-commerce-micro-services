"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AddressForm, CheckoutStepper, OrderSummaryPanel, PaymentForm, ReviewPanel, ShippingMethods } from "@/components/checkout";
import { CheckoutShell } from "@/components/layout";
import { endpoints } from "@/lib/api/client/endpoints";
import { api } from "@/lib/api/client/fetcher";
import type { CartResponse } from "@/lib/api/contracts/cart";
import type { CheckoutRequest, CheckoutResponse } from "@/lib/api/contracts/checkout";
import { useCartStore } from "@/lib/store/cart";
import { useCheckoutStore } from "@/lib/store/checkout";

export default function CheckoutPage() {
  const router = useRouter();
  const { step, address, shippingMethodId, payment, billingSameAsShipping, setField, setBillingSameAsShipping } = useCheckoutStore();
  const { subtotal, shipping, tax, total, setFromResponse } = useCartStore();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadCart() {
      const cart = await api.get<CartResponse>(endpoints.cart);
      setFromResponse(cart);
    }
    void loadCart();
  }, [setFromResponse]);

  async function placeOrder() {
    setSubmitting(true);
    setError(null);
    try {
      if (!address || !payment) {
        setError("Please provide shipping address and payment details before placing order.");
        return;
      }
      const payload: CheckoutRequest = {
        address,
        shippingMethodId,
        paymentMethod: payment,
      };
      const result = await api.post<CheckoutResponse>(endpoints.checkout, payload);
      router.push(`/checkout/success?orderId=${result.orderId}`);
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to place order");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <CheckoutShell>
        <div className="space-y-6">
          <CheckoutStepper current={step} />
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="space-y-5">
              <AddressForm value={address} onChange={(value) => setField("address", value)} />
              <ShippingMethods value={shippingMethodId} onChange={(value) => setField("shippingMethodId", value)} />
              <PaymentForm
                value={payment}
                onChange={(value) => setField("payment", value)}
                billingSameAsShipping={billingSameAsShipping}
                onBillingSameAsShipping={setBillingSameAsShipping}
              />
              <ReviewPanel onPlaceOrder={() => void placeOrder()} isSubmitting={submitting} error={error} />
            </div>
            <OrderSummaryPanel summary={{ subtotal, shipping, tax, total }} />
          </div>
        </div>
      </CheckoutShell>
    </div>
  );
}
