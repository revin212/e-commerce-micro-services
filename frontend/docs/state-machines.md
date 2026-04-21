# State Machines

## Order Timeline
- `processing` -> `packed` -> `shipped` -> `delivered`
- UI component: `OrderTimeline`
- Contract source: `src/lib/api/contracts/orders.ts`

## Inventory States
- `in_stock`
- `low_stock`
- `out_of_stock`
- Contract source: `src/lib/api/contracts/inventory.ts`

## Checkout Steps
- `0`: Address
- `1`: Shipping
- `2`: Payment
- `3`: Review
- Store source: `src/lib/store/checkout.ts`
