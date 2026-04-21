export type Order = {
  id: string;
  status: "processing" | "packed" | "shipped" | "delivered";
  eta: string;
  total: number;
};

export type OrderDetail = Order & {
  timeline: string[];
  address: string;
};
