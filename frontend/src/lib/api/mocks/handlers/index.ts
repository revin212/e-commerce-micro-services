import products from "../fixtures/products.json";
import product from "../fixtures/product-detail.json";
import search from "../fixtures/search.json";
import auth from "../fixtures/auth.json";

export const mockHandlers: Record<string, unknown> = {
  "/products": products,
  "/products/atelier-lamp": product,
  "/search": search,
  "/auth/login": auth,
  "/auth/register": auth,
};
