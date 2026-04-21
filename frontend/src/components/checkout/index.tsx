"use client";

import { Button, Checkbox, Input, Stepper } from "@/components/ui";
import type { CartResponse } from "@/lib/api/contracts/cart";

export function CheckoutStepper({ current }: { current: number }) {
  return <Stepper steps={["Address", "Shipping", "Payment", "Review"]} current={current} />;
}

export function AddressForm({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="space-y-3">
      <Input placeholder="Full name" />
      <Input placeholder="Street address" value={value} onChange={(event) => onChange(event.target.value)} />
      <Input placeholder="City" />
    </div>
  );
}

export function ShippingMethods({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 rounded-DEFAULT bg-surface-container-low p-3 text-sm">
        <input type="radio" name="shipping" checked={value === "standard"} onChange={() => onChange("standard")} />
        Standard (3-5 days)
      </label>
      <label className="flex items-center gap-2 rounded-DEFAULT bg-surface-container-low p-3 text-sm">
        <input type="radio" name="shipping" checked={value === "express"} onChange={() => onChange("express")} />
        Express (1-2 days)
      </label>
    </div>
  );
}

export function PaymentForm({
  value,
  onChange,
  billingSameAsShipping,
  onBillingSameAsShipping,
}: {
  value: string;
  onChange: (value: string) => void;
  billingSameAsShipping: boolean;
  onBillingSameAsShipping: (value: boolean) => void;
}) {
  return (
    <div className="space-y-3">
      <Input placeholder="Name on card" />
      <Input placeholder="Card number" value={value} onChange={(event) => onChange(event.target.value)} />
      <div className="grid grid-cols-2 gap-3">
        <Input placeholder="MM/YY" />
        <Input placeholder="CVC" />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <Checkbox checked={billingSameAsShipping} onChange={(event) => onBillingSameAsShipping(event.target.checked)} />
        Billing address is same as shipping
      </label>
    </div>
  );
}

export function ReviewPanel({
  onPlaceOrder,
  isSubmitting,
  error,
}: {
  onPlaceOrder: () => void;
  isSubmitting: boolean;
  error: string | null;
}) {
  return (
    <div className="space-y-3 rounded-lg bg-surface-container-low p-4">
      <p className="text-sm text-on-surface-variant">Atelier Lamp x1</p>
      <p className="text-sm text-on-surface-variant">Contour Vase x2</p>
      {error ? <p className="text-sm text-error">{error}</p> : null}
      <Button className="w-full" onClick={onPlaceOrder} disabled={isSubmitting}>
        {isSubmitting ? "Placing..." : "Place Order"}
      </Button>
    </div>
  );
}

export function OrderSummaryPanel({
  summary,
}: {
  summary?: Pick<CartResponse, "subtotal" | "shipping" | "tax" | "total">;
}) {
  const fallback = summary ?? { subtotal: 307, shipping: 12, tax: 26, total: 345 };
  return (
    <div className="rounded-lg bg-surface-container-low p-4">
      <h3 className="mb-2 font-semibold">Order Summary</h3>
      <div className="space-y-1 text-sm text-on-surface-variant">
        <p>Subtotal: ${fallback.subtotal.toFixed(2)}</p>
        <p>Shipping: ${fallback.shipping.toFixed(2)}</p>
        <p>Tax: ${fallback.tax.toFixed(2)}</p>
        <p className="font-medium text-on-surface">Total: ${fallback.total.toFixed(2)}</p>
      </div>
    </div>
  );
}
