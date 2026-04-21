"use client";

import Link from "next/link";
import { AddressForm, CheckoutStepper, OrderSummaryPanel, PaymentForm, ReviewPanel, ShippingMethods } from "@/components/checkout";
import { CheckoutShell } from "@/components/layout";
import { useCheckoutStore } from "@/lib/store/checkout";

export default function CheckoutPage() {
  const { step } = useCheckoutStore();
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <CheckoutShell>
        <div className="space-y-6">
          <CheckoutStepper current={step} />
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="space-y-5">
              <AddressForm />
              <ShippingMethods />
              <PaymentForm />
              <ReviewPanel />
              <Link href="/checkout/success" className="inline-block text-primary hover:underline">Complete in mock mode</Link>
            </div>
            <OrderSummaryPanel />
          </div>
        </div>
      </CheckoutShell>
    </div>
  );
}
