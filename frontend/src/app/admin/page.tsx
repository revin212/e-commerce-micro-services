import { AdminSidebar } from "@/components/layout";
import { AlertBanner, InventoryTable, KpiCard } from "@/components/admin";

export default function AdminPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-[260px_1fr]">
      <AdminSidebar />
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <AlertBanner />
        <div className="grid gap-4 md:grid-cols-3">
          <KpiCard label="Revenue" value="$128k" />
          <KpiCard label="Orders" value="1,423" />
          <KpiCard label="Stock Alerts" value="12" />
        </div>
        <InventoryTable />
      </div>
    </div>
  );
}
