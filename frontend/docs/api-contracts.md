# API Contracts

Contracts are defined in `src/lib/api/contracts/*`:

- `products.ts`: `Product`, `ListProductsQuery`, `ListProductsResponse`
- `search.ts`: `SearchResponse`
- `inventory.ts`: `InventoryItem`
- `cart.ts`: `CartItem`, `CartResponse`
- `checkout.ts`: `CheckoutRequest`, `CheckoutResponse`
- `orders.ts`: `Order`
- `account.ts`: `Account`
- `admin.ts`: `AdminDashboard`
- `auth.ts`: `LoginRequest`, `RegisterRequest`, `AuthResponse`

All contract files are frontend-owned and backend-facing. Backend implementation should match these payloads.
