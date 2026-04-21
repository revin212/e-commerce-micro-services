export type Order = {
  id: string;
  status: "processing" | "packed" | "shipped" | "delivered";
  eta: string;
  total: number;
};
