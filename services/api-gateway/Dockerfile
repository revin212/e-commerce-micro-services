FROM gradle:8.10-jdk21 AS builder
WORKDIR /workspace
COPY . /workspace
RUN gradle :services:api-gateway:bootJar --no-daemon

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=builder /workspace/services/api-gateway/build/libs/*.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
