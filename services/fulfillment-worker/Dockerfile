FROM gradle:8.10-jdk21 AS builder
WORKDIR /workspace
COPY . /workspace
RUN gradle :services:fulfillment-worker:bootJar --no-daemon

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=builder /workspace/services/fulfillment-worker/build/libs/*.jar /app/app.jar
ENTRYPOINT ["java","-jar","/app/app.jar"]
