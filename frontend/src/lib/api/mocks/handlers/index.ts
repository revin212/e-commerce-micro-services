import products from "../fixtures/products.json";
import product from "../fixtures/product-detail.json";
import search from "../fixtures/search.json";
import cart from "../fixtures/cart.json";
import orders from "../fixtures/orders.json";
import order from "../fixtures/order-detail.json";
import account from "../fixtures/account.json";
import admin from "../fixtures/admin-inventory.json";
import auth from "../fixtures/auth.json";

export const mockHandlers: Record<string, unknown> = {
  "/products": products,
  "/products/atelier-lamp": product,
  "/search": search,
  "/cart": cart,
  "/checkout": { orderId: "ord_1001", status: "confirmed" },
  "/orders": orders,
  "/orders/ord_1001": order,
  "/account": account,
  "/admin/inventory": admin,
  "/auth/login": auth,
  "/auth/register": auth,
};
