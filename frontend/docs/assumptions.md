# Assumptions

- Pagination shape: `{ items, page, pageSize, total }`
- Sort keys: `featured | price_asc | price_desc | newest`
- Auth header for real mode: `Authorization: Bearer <token>`
- Validation error shape: `[{ field, code, message }]`
- Currency: USD
- API mode switch uses `NEXT_PUBLIC_API_MODE=mock|real`
