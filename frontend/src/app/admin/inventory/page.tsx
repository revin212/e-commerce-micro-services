import { AdminSidebar } from "@/components/layout";
import { InventoryTable } from "@/components/admin";

export default function AdminInventoryPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-[260px_1fr]">
      <AdminSidebar />
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold">Inventory</h1>
        <InventoryTable />
      </div>
    </div>
  );
}
