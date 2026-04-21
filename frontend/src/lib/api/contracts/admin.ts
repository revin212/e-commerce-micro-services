import type { InventoryItem } from "./inventory";

export type AdminDashboard = {
  kpis: Array<{ label: string; value: string; trend: "up" | "flat" | "down" }>;
  inventory: InventoryItem[];
};
