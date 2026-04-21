"use client";

import { Button, Checkbox, Input, Stepper } from "@/components/ui";

export function CheckoutStepper({ current }: { current: number }) {
  return <Stepper steps={["Address", "Shipping", "Payment", "Review"]} current={current} />;
}

export function AddressForm() {
  return (
    <div className="space-y-3">
      <Input placeholder="Full name" />
      <Input placeholder="Street address" />
      <Input placeholder="City" />
    </div>
  );
}

export function ShippingMethods() {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 rounded-DEFAULT bg-surface-container-low p-3 text-sm">
        <input type="radio" name="shipping" defaultChecked />
        Standard (3-5 days)
      </label>
      <label className="flex items-center gap-2 rounded-DEFAULT bg-surface-container-low p-3 text-sm">
        <input type="radio" name="shipping" />
        Express (1-2 days)
      </label>
    </div>
  );
}

export function PaymentForm() {
  return (
    <div className="space-y-3">
      <Input placeholder="Name on card" />
      <Input placeholder="Card number" />
      <div className="grid grid-cols-2 gap-3">
        <Input placeholder="MM/YY" />
        <Input placeholder="CVC" />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <Checkbox defaultChecked />
        Billing address is same as shipping
      </label>
    </div>
  );
}

export function ReviewPanel() {
  return (
    <div className="space-y-3 rounded-lg bg-surface-container-low p-4">
      <p className="text-sm text-on-surface-variant">Atelier Lamp x1</p>
      <p className="text-sm text-on-surface-variant">Contour Vase x2</p>
      <Button className="w-full">Place Order</Button>
    </div>
  );
}

export function OrderSummaryPanel() {
  return (
    <div className="rounded-lg bg-surface-container-low p-4">
      <h3 className="mb-2 font-semibold">Order Summary</h3>
      <div className="space-y-1 text-sm text-on-surface-variant">
        <p>Subtotal: $307.00</p>
        <p>Shipping: $12.00</p>
        <p>Tax: $26.00</p>
        <p className="font-medium text-on-surface">Total: $345.00</p>
      </div>
    </div>
  );
}
