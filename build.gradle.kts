plugins {
  base
}

allprojects {
  group = "com.portocommerce"
  version = "0.1.0"

  repositories {
    mavenCentral()
  }
}

subprojects {
  tasks.withType<Test>().configureEach {
    useJUnitPlatform()
  }
}
