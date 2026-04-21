import { Badge, Card, Input, Pagination, RowActionsMenu } from "@/components/ui";
import type { AdminDashboard } from "@/lib/api/contracts/admin";

export function KpiCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <p className="text-sm text-on-surface-variant">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </Card>
  );
}

export function AlertBanner({ lowStockCount }: { lowStockCount: number }) {
  return (
    <div className="rounded-lg bg-error-container px-4 py-3 text-sm text-error">
      {lowStockCount} SKUs are low stock and need replenishment.
    </div>
  );
}

export function InventoryTable({ inventory }: { inventory: AdminDashboard["inventory"] }) {
  return (
    <div className="rounded-lg bg-surface-container-low p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <Input placeholder="Search inventory..." />
      </div>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-on-surface-variant">
            <th className="py-2">SKU</th>
            <th className="py-2">Stock</th>
            <th className="py-2">Status</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.productId}>
              <td className="py-2">{item.sku}</td>
              <td className="py-2">{item.stock}</td>
              <td className="py-2"><Badge>{item.status.replaceAll("_", " ")}</Badge></td>
              <td className="py-2"><RowActionsMenu items={["Edit", "Archive"]} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <Pagination page={1} total={Math.max(1, Math.ceil(inventory.length / 10))} />
      </div>
    </div>
  );
}
