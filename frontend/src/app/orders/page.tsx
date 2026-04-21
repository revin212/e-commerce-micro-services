import Link from "next/link";
import { OrderStatusPill } from "@/components/orders";
import { Card } from "@/components/ui";
import { api } from "@/lib/api/client/fetcher";
import type { Order } from "@/lib/api/contracts/orders";

export default async function OrdersPage() {
  const orders = await api.get<Order[]>("/orders");
  return (
    <div className="mx-auto max-w-7xl space-y-4 px-6 py-10">
      <h1 className="text-3xl font-semibold">Orders</h1>
      {orders.map((order) => (
        <Card key={order.id} className="flex items-center justify-between">
          <div>
            <p className="font-medium">{order.id}</p>
            <p className="text-sm text-on-surface-variant">ETA {order.eta}</p>
          </div>
          <div className="flex items-center gap-3">
            <OrderStatusPill status={order.status} />
            <Link href={`/orders/${order.id}`} className="text-primary hover:underline">View</Link>
          </div>
        </Card>
      ))}
    </div>
  );
}
