import { AccountSidebar } from "@/components/layout";
import { Button, Card } from "@/components/ui";

export default function AccountAddressesPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-[260px_1fr]">
      <AccountSidebar />
      <Card className="space-y-4">
        <h1 className="text-3xl font-semibold">Addresses</h1>
        <div className="rounded-DEFAULT bg-surface-container-high p-4">
          <p>29 Mercer St, New York, NY</p>
          <p className="text-sm text-on-surface-variant">Default shipping address</p>
        </div>
        <Button variant="secondary">Add New Address</Button>
      </Card>
    </div>
  );
}
