rootProject.name = "porto-project-3"

include(
  "services:api-gateway",
  "services:inventory-grpc",
  "services:payment-worker",
  "services:fulfillment-worker",
  "contracts:proto",
)
