# PortoCommerce Monorepo

Full-stack e-commerce project with:
- Java/Spring Boot microservices (API gateway + workers + gRPC inventory)
- Next.js frontend
- Docker-based local infrastructure (Postgres, Redis, Kafka, Elasticsearch, Jaeger, Kibana)

## Repository Layout

- `services/` - backend services
- `contracts/` - shared API/gRPC contracts
- `infra/` - local Docker Compose stack
- `frontend/` - Next.js frontend
- `docs/` - architecture and API notes
- `ui-design/` - design assets and screens

## Prerequisites

- Java 21
- Node.js 20+ and npm
- Docker Desktop

## Quick Start (Docker-first)

From repository root:

```bash
docker compose -f infra/docker-compose.yml up -d --build
```

Main local endpoints:
- API gateway: `http://localhost:8080`
- Frontend dev server: `http://localhost:3000` (when running)
- Kafka UI: `http://localhost:8085`
- Kibana: `http://localhost:5601`
- Jaeger: `http://localhost:16686`

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Use real backend mode:

```bash
cd frontend
cp .env.local.example .env.local
```

Set:

```bash
NEXT_PUBLIC_API_MODE=real
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

Then run:

```bash
npm run dev:real
```

## Backend Without Docker (optional)

Start infra dependencies first:

```bash
docker compose -f infra/docker-compose.yml up -d postgres redis kafka elasticsearch jaeger
```

Run services in separate terminals:

```bash
gradle :services:inventory-grpc:bootRun
gradle :services:payment-worker:bootRun
gradle :services:fulfillment-worker:bootRun
gradle :services:api-gateway:bootRun
```

## Troubleshooting

- If API gateway fails with Elasticsearch connection errors on startup, wait for Elasticsearch and restart API gateway:

```bash
docker compose -f infra/docker-compose.yml up -d --no-deps api-gateway
```

- If Docker returns engine API 500 errors, restart Docker Desktop and rerun compose.

## Additional Docs

- `docs/runbook.md`
- `docs/architecture.md`
- `docs/api.md`
- `frontend/README.md`
