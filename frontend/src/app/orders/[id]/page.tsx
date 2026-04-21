import { OrderItemsTable, OrderTimeline } from "@/components/orders";
import { OrderSummaryPanel } from "@/components/checkout";
import { api } from "@/lib/api/client/fetcher";
import { endpoints } from "@/lib/api/client/endpoints";
import type { OrderDetail } from "@/lib/api/contracts/orders";

type Params = { id: string };

export default async function TrackOrderPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const order = await api.get<OrderDetail>(endpoints.orderById(id));
  const currentStep = order.timeline ? Math.max(order.timeline.indexOf(order.status), 0) : 2;
  return (
    <div className="mx-auto max-w-7xl space-y-5 px-6 py-10">
      <h1 className="text-3xl font-semibold">Track {order.id}</h1>
      <OrderTimeline current={currentStep} />
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <OrderItemsTable />
        <div className="space-y-4">
          <div className="rounded-lg bg-surface-container-low p-4">
            <p className="text-sm text-on-surface-variant">Shipping address</p>
            <p className="mt-1">{order.address}</p>
            <p className="mt-2 text-sm text-on-surface-variant">ETA {order.eta}</p>
          </div>
          <OrderSummaryPanel summary={{ subtotal: Number(order.total), shipping: 0, tax: 0, total: Number(order.total) }} />
        </div>
      </div>
    </div>
  );
}
