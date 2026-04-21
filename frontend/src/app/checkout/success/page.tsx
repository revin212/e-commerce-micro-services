import Link from "next/link";
import { Button, Card } from "@/components/ui";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;
  const resolvedOrderId = orderId ?? "ord_1001";
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Card className="space-y-4 text-center">
        <h1 className="text-3xl font-semibold">Order Confirmed</h1>
        <p className="text-on-surface-variant">Your order #{resolvedOrderId} is now being processed.</p>
        <Link href={`/orders/${resolvedOrderId}`}><Button>Track Order</Button></Link>
      </Card>
    </div>
  );
}
