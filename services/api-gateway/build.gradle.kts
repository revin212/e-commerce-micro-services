plugins {
  id("org.springframework.boot") version "3.3.4"
  id("io.spring.dependency-management") version "1.1.6"
  java
}

dependencies {
  implementation(project(":contracts:proto"))

  implementation("org.springframework.boot:spring-boot-starter-web")
  implementation("org.springframework.boot:spring-boot-starter-data-jpa")
  implementation("org.springframework.boot:spring-boot-starter-data-redis")
  implementation("org.springframework.boot:spring-boot-starter-validation")
  implementation("org.springframework.boot:spring-boot-starter-security")
  implementation("org.springframework.boot:spring-boot-starter-actuator")
  implementation("io.micrometer:micrometer-tracing-bridge-otel")
  implementation("io.opentelemetry:opentelemetry-exporter-otlp")
  implementation("org.springframework.kafka:spring-kafka")
  implementation("org.springframework.boot:spring-boot-starter-data-elasticsearch")
  implementation("org.flywaydb:flyway-core")
  implementation("org.flywaydb:flyway-database-postgresql")
  implementation("io.jsonwebtoken:jjwt-api:0.12.6")
  implementation("io.grpc:grpc-netty-shaded:1.65.1")
  implementation("io.grpc:grpc-stub:1.65.1")
  implementation("io.grpc:grpc-protobuf:1.65.1")
  implementation("net.logstash.logback:logstash-logback-encoder:8.0")

  runtimeOnly("org.postgresql:postgresql")
  runtimeOnly("io.jsonwebtoken:jjwt-impl:0.12.6")
  runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.12.6")

  testImplementation("org.springframework.boot:spring-boot-starter-test")
  testImplementation("org.springframework.kafka:spring-kafka-test")
  testImplementation("org.testcontainers:junit-jupiter")
  testImplementation("org.testcontainers:postgresql")
  testImplementation("org.testcontainers:kafka")
  testImplementation("org.testcontainers:elasticsearch")
}

java {
  toolchain {
    languageVersion.set(JavaLanguageVersion.of(21))
  }
}
