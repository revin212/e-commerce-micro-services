# PortoCommerce Frontend

Frontend-first Next.js implementation for PortoCommerce with typed API contracts and swappable mock/real API mode.

## Scripts

- `npm run dev` - run in mock mode
- `npm run dev:real` - run in real API mode
- `npm run build` - production build
- `npm run lint` - ESLint
- `npm run typecheck` - TypeScript no-emit checks
- `npm run format` - Prettier format

## Environment

Copy `.env.local.example` to `.env.local`:

```bash
NEXT_PUBLIC_API_MODE=mock
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

## Contracts and mocks

- Contracts: `src/lib/api/contracts/*`
- API client: `src/lib/api/client/*`
- Mock router + fixtures: `src/lib/api/mocks/*`
- Backend handoff docs: `docs/*`

## Route map

- `/` Home
- `/shop` Shop all
- `/search` Search overlay
- `/product/[slug]` Product detail
- `/cart`, `/checkout`, `/checkout/success`
- `/orders`, `/orders/[id]`
- `/account/profile`, `/account/addresses`, `/account/payment`, `/account/wishlist`
- `/admin`, `/admin/inventory`
- `/login`, `/register`, `/forgot-password`
