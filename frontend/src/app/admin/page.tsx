import { AdminSidebar } from "@/components/layout";
import { AlertBanner, InventoryTable, KpiCard } from "@/components/admin";
import { endpoints } from "@/lib/api/client/endpoints";
import { api } from "@/lib/api/client/fetcher";
import type { AdminDashboard } from "@/lib/api/contracts/admin";

export default async function AdminPage() {
  let dashboard: AdminDashboard;
  try {
    dashboard = await api.get<AdminDashboard>(endpoints.adminInventory);
  } catch {
    return (
      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <p className="mt-3 text-on-surface-variant">You do not have access to this page. Sign in as an admin account.</p>
      </div>
    );
  }
  const lowStockCount = dashboard.inventory.filter((item) => item.lowStock).length;
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-[260px_1fr]">
      <AdminSidebar />
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <AlertBanner lowStockCount={lowStockCount} />
        <div className="grid gap-4 md:grid-cols-3">
          {dashboard.kpis.map((kpi) => (
            <KpiCard key={kpi.label} label={kpi.label} value={kpi.value} />
          ))}
        </div>
        <InventoryTable inventory={dashboard.inventory} />
      </div>
    </div>
  );
}
