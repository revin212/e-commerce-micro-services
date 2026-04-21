# Frontend-Backend Rollout Checklist

## Configuration defaults
- Set `NEXT_PUBLIC_API_MODE=real` for all non-local environments.
- Set `NEXT_PUBLIC_API_BASE_URL=/api/proxy` so browser calls always pass through Next route handlers.
- Set `API_GATEWAY_BASE_URL` to the reachable gateway URL in each environment.
- Set `SESSION_COOKIE_NAME` and `SESSION_COOKIE_TTL_SECONDS` per security policy.

## Security and access
- Verify login and register set an HTTP-only session cookie.
- Verify customer sessions cannot access `/admin/inventory` and receive `401/403`.
- Verify admin sessions can access `/admin/inventory`.

## Observability checkpoints
- Confirm frontend requests include `x-request-id`.
- Confirm Next proxy forwards `x-request-id` to the backend gateway.
- Confirm backend logs/traces expose the same request ID for troubleshooting.

## Functional smoke checks
- Browse products (`/`, `/shop`, `/product/[slug]`).
- Add/remove/update cart items and verify totals.
- Complete checkout and verify redirect with generated `orderId`.
- Verify orders list/detail and account profile render from backend data.

## Mock mode policy
- Keep mock mode only for local UI fallback and demos.
- Do not use mock mode in staging or production deployments.
