import type { Product } from "./products";

export type SearchResponse = {
  query: string;
  suggestions: string[];
  collections: string[];
  results: Product[];
};
