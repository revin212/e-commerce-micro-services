import { Badge, Card } from "@/components/ui";

export function OrderTimeline({ current }: { current: number }) {
  const steps = ["processing", "packed", "shipped", "delivered"];
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {steps.map((step, index) => (
        <Card key={step} className={index <= current ? "bg-surface-bright" : ""}>
          <p className="text-xs uppercase tracking-wide text-on-surface-variant">{step}</p>
          <p className="font-medium">{index <= current ? "Complete" : "Pending"}</p>
        </Card>
      ))}
    </div>
  );
}

export function OrderStatusPill({ status }: { status: string }) {
  return <Badge className="capitalize">{status}</Badge>;
}

export function OrderItemsTable() {
  return (
    <div className="rounded-lg bg-surface-container-low p-4">
      <h3 className="mb-3 font-semibold">Items</h3>
      <div className="space-y-2 text-sm">
        <p>Atelier Lamp x1 - $189</p>
        <p>Contour Vase x2 - $118</p>
      </div>
    </div>
  );
}
