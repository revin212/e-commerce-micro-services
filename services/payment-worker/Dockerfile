FROM gradle:8.10-jdk21 AS builder
WORKDIR /workspace
COPY . /workspace
RUN gradle :services:payment-worker:bootJar --no-daemon

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=builder /workspace/services/payment-worker/build/libs/*.jar /app/app.jar
ENTRYPOINT ["java","-jar","/app/app.jar"]
