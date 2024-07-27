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
COPY --from=build /app/target/config-server-0.0.1-SNAPSHOT.jar /app/config-server-0.0.1-SNAPSHOT.jar
EXPOSE 8888
ENTRYPOINT ["java", "-jar", "config-server-0.0.1-SNAPSHOT.jar"]
