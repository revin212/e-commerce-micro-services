plugins {
  id("org.springframework.boot") version "3.3.4"
  id("io.spring.dependency-management") version "1.1.6"
  java
}

dependencies {
  implementation("org.springframework.boot:spring-boot-starter")
  implementation("org.springframework.kafka:spring-kafka")
  testImplementation("org.springframework.boot:spring-boot-starter-test")
}

java {
  toolchain {
    languageVersion.set(JavaLanguageVersion.of(21))
  }
}
