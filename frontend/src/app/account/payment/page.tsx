import { AccountSidebar } from "@/components/layout";
import { Button, Card } from "@/components/ui";

export default function AccountPaymentPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-[260px_1fr]">
      <AccountSidebar />
      <Card className="space-y-4">
        <h1 className="text-3xl font-semibold">Payment Methods</h1>
        <div className="rounded-DEFAULT bg-surface-container-high p-4">
          <p>Visa ending in 4242</p>
          <p className="text-sm text-on-surface-variant">Expires 12/28</p>
        </div>
        <Button variant="secondary">Add Payment Method</Button>
      </Card>
    </div>
  );
}
