import type { Paginated } from "./common";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: { amount: number; currency: "USD" };
  images: string[];
  rating?: { average: number; count: number };
  badges?: Array<"new" | "bestseller">;
  variants: Array<{ id: string; color: string; size: string; inStock: boolean }>;
};

export type ListProductsQuery = {
  q?: string;
  category?: string[];
  inStockOnly?: boolean;
  sort?: "featured" | "price_asc" | "price_desc" | "newest";
  page?: number;
  pageSize?: number;
};

export type ListProductsResponse = Paginated<Product>;
