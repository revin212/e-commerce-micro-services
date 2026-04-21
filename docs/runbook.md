# Local Runbook

## Prerequisites
- Java 21
- Docker Desktop

## Start infrastructure
```bash
docker compose -f infra/docker-compose.yml up -d
```

## Build services
```bash
gradle :services:api-gateway:bootJar :services:inventory-grpc:bootJar :services:payment-worker:bootJar :services:fulfillment-worker:bootJar
```

## Run services (separate terminals)
```bash
gradle :services:inventory-grpc:bootRun
gradle :services:payment-worker:bootRun
gradle :services:fulfillment-worker:bootRun
gradle :services:api-gateway:bootRun
```

## Frontend real mode
In `frontend/.env.local` set:
```bash
NEXT_PUBLIC_API_MODE=real
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

Then run:
```bash
cd frontend
npm run dev
```
