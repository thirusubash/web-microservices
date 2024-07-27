# Stage 1: Build the application
FROM maven:3.8.4-openjdk-17 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven project files to the container
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the rest of the project files to the container
COPY . .

# Run the Maven build (skip tests for faster builds)
RUN mvn clean package -DskipTests 

# Stage 2: Create the final image
FROM openjdk:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/auth-service-0.0.1-SNAPSHOT.jar ./auth-service.jar

# Expose the port the application runs on
EXPOSE 8080

# Define the command to run the application
ENTRYPOINT ["java", "-jar", "auth-service.jar"]
