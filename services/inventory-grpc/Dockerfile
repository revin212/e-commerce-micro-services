FROM gradle:8.10-jdk21 AS builder
WORKDIR /workspace
COPY . /workspace
RUN gradle :services:inventory-grpc:bootJar --no-daemon

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=builder /workspace/services/inventory-grpc/build/libs/*.jar /app/app.jar
EXPOSE 8082 9090
ENTRYPOINT ["java","-jar","/app/app.jar"]
