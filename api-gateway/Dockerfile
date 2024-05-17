# Stage 1: Build
FROM maven:3.8.3-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src /app/src
RUN mvn package -DskipTests

# Stage 2: Run
FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/api-gateway-0.0.1-SNAPSHOT.jar /app/api-gateway.jar
EXPOSE 8080
CMD ["java", "-jar", "api-gateway.jar"]
