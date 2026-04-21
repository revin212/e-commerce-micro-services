export type InventoryItem = {
  productId: string;
  sku: string;
  stock: number;
  lowStock: boolean;
  status: "in_stock" | "low_stock" | "out_of_stock";
};
