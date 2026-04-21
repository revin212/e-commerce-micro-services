"use client";

import Link from "next/link";
import { OrderSummaryPanel } from "@/components/checkout";
import { Button, Card, Input, QuantityStepper } from "@/components/ui";
import { useCartStore } from "@/lib/store/cart";

export default function CartPage() {
  const { items, updateQty, remove } = useCartStore();
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold">Shopping Cart</h1>
        {(items.length ? items : [{ id: "p_1", name: "Atelier Lamp", price: 189, quantity: 1 }]).map((item) => (
          <Card key={item.id} className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-on-surface-variant">${item.price}</p>
            </div>
            <QuantityStepper value={item.quantity} onChange={(value) => updateQty(item.id, value)} />
            <button onClick={() => remove(item.id)} className="text-sm text-primary">Remove</button>
          </Card>
        ))}
        <div className="rounded-lg bg-surface-container-low p-4">
          <p className="mb-2 text-sm">Promo code</p>
          <div className="flex gap-2">
            <Input placeholder="ATELIER10" />
            <Button variant="secondary">Apply</Button>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <OrderSummaryPanel />
        <Link href="/checkout"><Button className="w-full">Proceed to Checkout</Button></Link>
      </div>
    </div>
  );
}
