plugins {
  id("org.springframework.boot") version "3.3.4"
  id("io.spring.dependency-management") version "1.1.6"
  java
}

dependencies {
  implementation(platform("io.grpc:grpc-bom:1.65.1"))
  implementation(project(":contracts:proto"))
  implementation("org.springframework.boot:spring-boot-starter")
  implementation("org.springframework.boot:spring-boot-starter-data-jpa")
  implementation("org.springframework.kafka:spring-kafka")
  implementation("net.devh:grpc-server-spring-boot-starter:3.1.0.RELEASE")
  implementation("io.grpc:grpc-api")
  implementation("io.grpc:grpc-core")
  implementation("io.grpc:grpc-protobuf")
  implementation("io.grpc:grpc-stub")
  implementation("io.grpc:grpc-netty-shaded")
  runtimeOnly("org.postgresql:postgresql")
  testImplementation("org.springframework.boot:spring-boot-starter-test")
}

java {
  toolchain {
    languageVersion.set(JavaLanguageVersion.of(21))
  }
}
