plugins {
  id("java-library")
  id("com.google.protobuf") version "0.9.4"
}

dependencies {
  implementation("io.grpc:grpc-protobuf:1.65.1")
  implementation("io.grpc:grpc-stub:1.65.1")
  implementation("com.google.protobuf:protobuf-java:3.25.3")
  compileOnly("org.apache.tomcat:annotations-api:6.0.53")
}

java {
  toolchain {
    languageVersion.set(JavaLanguageVersion.of(21))
  }
}

protobuf {
  protoc {
    artifact = "com.google.protobuf:protoc:3.25.3"
  }
  plugins {
    create("grpc") {
      artifact = "io.grpc:protoc-gen-grpc-java:1.65.1"
    }
  }
  generateProtoTasks {
    all().configureEach {
      plugins {
        create("grpc")
      }
    }
  }
}

sourceSets {
  main {
    proto {
      srcDir("src/main/proto")
    }
  }
}

tasks.named<org.gradle.language.jvm.tasks.ProcessResources>("processResources") {
  duplicatesStrategy = org.gradle.api.file.DuplicatesStrategy.EXCLUDE
}
