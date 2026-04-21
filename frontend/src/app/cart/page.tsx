"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { OrderSummaryPanel } from "@/components/checkout";
import { Button, Card, Input, QuantityStepper } from "@/components/ui";
import { endpoints } from "@/lib/api/client/endpoints";
import { api } from "@/lib/api/client/fetcher";
import type { CartResponse } from "@/lib/api/contracts/cart";
import { useCartStore } from "@/lib/store/cart";

export default function CartPage() {
  const { items, setFromResponse, subtotal, shipping, tax, total } = useCartStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCart() {
      try {
        const cart = await api.get<CartResponse>(endpoints.cart);
        setFromResponse(cart);
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : "Unable to load cart");
      } finally {
        setLoading(false);
      }
    }
    void loadCart();
  }, [setFromResponse]);

  async function updateQty(productId: string, quantity: number, name: string, price: number) {
    const cart = await api.patch<CartResponse>(endpoints.cart, { productId, name, quantity, price });
    setFromResponse(cart);
  }

  async function remove(productId: string) {
    const cart = await api.delete<CartResponse>(`${endpoints.cart}/${productId}`);
    setFromResponse(cart);
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold">Shopping Cart</h1>
        {loading ? <p className="text-sm text-on-surface-variant">Loading cart...</p> : null}
        {error ? <p className="text-sm text-error">{error}</p> : null}
        {items.map((item) => (
          <Card key={item.productId} className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-on-surface-variant">${item.price}</p>
            </div>
            <QuantityStepper value={item.quantity} onChange={(value) => void updateQty(item.productId, value, item.name, item.price)} />
            <button onClick={() => void remove(item.productId)} className="text-sm text-primary">Remove</button>
          </Card>
        ))}
        {!loading && items.length === 0 ? <p className="text-sm text-on-surface-variant">Your cart is empty.</p> : null}
        <div className="rounded-lg bg-surface-container-low p-4">
          <p className="mb-2 text-sm">Promo code</p>
          <div className="flex gap-2">
            <Input placeholder="ATELIER10" />
            <Button variant="secondary">Apply</Button>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <OrderSummaryPanel summary={{ subtotal, shipping, tax, total }} />
        <Link href="/checkout"><Button className="w-full">Proceed to Checkout</Button></Link>
      </div>
    </div>
  );
}
