# Use an official Maven image with JDK 17 for building the project
FROM maven:3.8.4-openjdk-17 AS build

# Copy the source code and pom.xml into the container
COPY src /home/app/src
COPY pom.xml /home/app

# Build the application
RUN mvn -f /home/app/pom.xml clean package

# Use OpenJDK 17 for running the application
FROM openjdk:17-slim

# Copy the JAR file from the build stage
COPY --from=build /home/app/target/config-server-*.jar /usr/local/lib/config-server.jar

# Expose the port the app runs on
EXPOSE 8888

# Run the application
ENTRYPOINT ["java", "-jar", "/usr/local/lib/config-server.jar"]
