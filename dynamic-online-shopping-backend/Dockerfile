FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN apt-get update && apt-get install -y maven
RUN mvn clean package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/dynamic-online-shopping-backend-0.0.1-SNAPSHOT.jar"]