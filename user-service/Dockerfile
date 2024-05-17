# Stage 1: Build (builder)
FROM maven:3.8.5-openjdk-17-slim AS builder

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Build the application
RUN mvn clean install -DskipTests

# Stage 2: Run (runtime)
FROM openjdk:17-slim

# Set working directory
WORKDIR /app

# Copy JAR file from the builder stage
COPY --from=builder /app/target/*.jar app.jar


# Expose port (adjust if needed)
EXPOSE 8081

# Command to run the application
CMD ["java", "-jar", "app.jar"]
