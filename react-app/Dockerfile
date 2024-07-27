# Stage 1: Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Clean npm cache (not always necessary)
RUN npm cache clean --force

# Install dependencies with --legacy-peer-deps
RUN npm install --force

# Copy the rest of the application source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production stage
FROM nginx:alpine

# Copy the build output from the previous stage to Nginx's default public directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf


# Expose port HTTP 80 (default port for Nginx)
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]

# Metadata
LABEL maintainer="THIRUMALAIVASAN K <thiruhcl2016@gmail.com>"
LABEL description="This is gksvp.com React app for frontend server."
LABEL version="1.0"
LABEL vendor="gksvp.com"
