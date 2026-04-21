import { Badge, Card, Input, Pagination, RowActionsMenu } from "@/components/ui";

export function KpiCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <p className="text-sm text-on-surface-variant">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </Card>
  );
}

export function AlertBanner() {
  return (
    <div className="rounded-lg bg-error-container px-4 py-3 text-sm text-error">
      12 SKUs are low stock and need replenishment.
    </div>
  );
}

export function InventoryTable() {
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
          <tr>
            <td className="py-2">ATL-001</td>
            <td className="py-2">22</td>
            <td className="py-2"><Badge>In stock</Badge></td>
            <td className="py-2"><RowActionsMenu items={["Edit", "Archive"]} /></td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4">
        <Pagination page={1} total={4} />
      </div>
    </div>
  );
}
