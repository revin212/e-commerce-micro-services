# PortoCommerce Architecture

PortoCommerce uses a frontend-facing REST API (`api-gateway`) with internal gRPC (`inventory-grpc`) and Kafka workers for asynchronous order processing.

## Components
- `frontend/`: Next.js storefront.
- `services/api-gateway`: REST APIs, auth, checkout orchestration, search, account/admin.
- `services/inventory-grpc`: inventory availability and reservation service.
- `services/payment-worker`: consumes `order.placed`, emits `payment.authorized`.
- `services/fulfillment-worker`: consumes `payment.authorized`, emits `fulfillment.created` and `shipment.dispatched`.
- `infra/docker-compose.yml`: local dependencies (Postgres, Redis, Kafka, Elasticsearch, Kibana, Jaeger).

## Data flow
1. Frontend calls `POST /checkout`.
2. API gateway reserves stock via gRPC.
3. API gateway stores order and publishes `order.placed`.
4. Payment worker emits `payment.authorized`.
5. Fulfillment worker emits `shipment.dispatched`.
6. API gateway consumes status events and updates order timeline.
