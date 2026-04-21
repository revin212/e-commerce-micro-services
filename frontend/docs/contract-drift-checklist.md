# Contract Drift Checklist

Use this checklist whenever backend REST contracts change.

## Endpoints and payloads
- `POST /auth/register` and `POST /auth/login` return `{ token, user }`.
- `GET /products` returns `{ items, page, pageSize, total }`.
- `GET /products/{slug}` returns a single `Product`.
- `GET/POST/PATCH/DELETE /cart` uses `CartResponse`.
- `POST /checkout` returns `{ orderId, status }`.
- `GET /orders` and `GET /orders/{id}` fields match `contracts/orders.ts`.
- `GET /account` fields match `contracts/account.ts`.
- `GET /admin/inventory` fields match `contracts/admin.ts`.

## Error payloads
- Validation errors are arrays of `{ field, code, message }`.
- Business errors are objects with `{ message, code, field }`.
- Frontend `ApiClientError` parsing still supports both payload shapes.

## Required updates when a contract changes
- Update corresponding TypeScript contract in `src/lib/api/contracts`.
- Update `src/lib/api/client/endpoints.ts` if paths changed.
- Update proxy/auth route handlers under `src/app/api`.
- Update mock fixtures under `src/lib/api/mocks/fixtures` if still used.
- Update integration tests in `src/lib/api/client/fetcher.test.ts`.
