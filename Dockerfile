# Simple single-stage Dockerfile for staging
FROM node:20-alpine

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (dev + prod) for building
RUN npm install

# Copy all source files
COPY . .

# Accept Vite environment variables as build args
ARG BUILD_ENV=stage
ARG VITE_BASE_PATH=/
ARG VITE_API_URL
ARG VITE_APP_ENV=staging

# Set environment variables for build
ENV VITE_BASE_PATH=${VITE_BASE_PATH}
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_APP_ENV=${VITE_APP_ENV}

# Build frontend
RUN npm run build:stage

# Create directories for runtime
RUN mkdir -p server/db server/uploads

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --retries=3 --start-period=40s \
    CMD node -e "require('http').get('http://localhost:3001/v1/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

# Use dumb-init
ENTRYPOINT ["dumb-init", "--"]

# Start server
CMD ["node", "server/index.cjs"]
