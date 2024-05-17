# Use an appropriate base image with Java and Maven installed
FROM maven:3.8.5-openjdk-17-slim AS build

# Set the working directory in the container
WORKDIR /app

# Copy the Maven project file and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the entire project and build the application
COPY src src
RUN mvn package -DskipTests

# Use a lightweight base image, 'openjdk:17-slim' in this case since '17-jre-slim' is unavailable
FROM openjdk:17-slim

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file built in the previous stage using a wildcard to match the JAR file name
COPY --from=build /app/target/*.jar app.jar

# Expose the port the application runs on
EXPOSE 8761

# Command to run the application
CMD ["java", "-jar", "app.jar"]
