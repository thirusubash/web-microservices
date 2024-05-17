# Step 1: Build stage
# Use Maven with JDK 17 to build the project
FROM maven:3.8.5-openjdk-17-slim AS build

# Set the working directory in the Docker image
WORKDIR /app

# Copy the Maven project definition files (pom.xml)
COPY pom.xml .

# Optionally, download all required dependencies to improve subsequent builds
RUN mvn dependency:go-offline

# Copy the project source code
COPY src src

# Build the application
RUN mvn package -DskipTests

# Step 2: Package stage
# Use OpenJDK 17 to run the application
FROM openjdk:17-slim

# Set the working directory in the Docker image
WORKDIR /app

# Copy the built application from the build stage to the current stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port the application uses
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "app.jar"]
