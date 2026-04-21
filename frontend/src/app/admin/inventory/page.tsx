import { AdminSidebar } from "@/components/layout";
import { InventoryTable } from "@/components/admin";
import { endpoints } from "@/lib/api/client/endpoints";
import { api } from "@/lib/api/client/fetcher";
import type { AdminDashboard } from "@/lib/api/contracts/admin";

export default async function AdminInventoryPage() {
  let dashboard: AdminDashboard;
  try {
    dashboard = await api.get<AdminDashboard>(endpoints.adminInventory);
  } catch {
    return (
      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-3xl font-semibold">Inventory</h1>
        <p className="mt-3 text-on-surface-variant">Admin privileges are required to view inventory data.</p>
      </div>
    );
  }
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-[260px_1fr]">
      <AdminSidebar />
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold">Inventory</h1>
        <InventoryTable inventory={dashboard.inventory} />
      </div>
    </div>
  );
}
