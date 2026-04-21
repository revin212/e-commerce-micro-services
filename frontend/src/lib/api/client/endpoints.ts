export const endpoints = {
  products: "/products",
  productBySlug: (slug: string) => `/products/${slug}`,
  search: "/search",
  inventory: "/inventory",
  cart: "/cart",
  checkout: "/checkout",
  orders: "/orders",
  orderById: (id: string) => `/orders/${id}`,
  account: "/account",
  adminInventory: "/admin/inventory",
  authLogin: "/auth/login",
  authRegister: "/auth/register",
};
