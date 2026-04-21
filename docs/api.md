# API and Event Contracts

## REST Endpoints
- `POST /auth/register` -> `{ token, user: { id, name, email } }`
- `POST /auth/login` -> `{ token, user: { id, name, email } }`
- `GET /products` -> `{ items, page, pageSize, total }`
- `GET /products/{slug}` -> `Product`
- `GET /search?q=` -> `{ query, suggestions, collections, results }`
- `GET /inventory` -> `InventoryItem[]`
- `GET/POST/PATCH /cart`, `DELETE /cart/{productId}` -> `CartResponse`
- `POST /checkout` -> `{ orderId, status: "confirmed" }`
- `GET /orders`, `GET /orders/{id}`
- `GET /account`
- `GET /admin/inventory`

## gRPC
`contracts/proto/src/main/proto/inventory.proto` defines:
- `CheckAvailability`
- `ReserveStock`
- `ReleaseReservation`

## Kafka Topics
- `order.placed`
- `payment.authorized`
- `payment.failed`
- `fulfillment.created`
- `shipment.dispatched`
- `product.changed`
- `inventory.reservation.created`
- `inventory.reservation.released`
