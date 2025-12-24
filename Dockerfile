# Multi-stage Dockerfile for ionet-web
# Supports both staging and production environments

# ============================================
# Stage 1: Build Stage
# ============================================
FROM node:20-alpine AS builder

# Build argument for environment (stage or production)
ARG BUILD_ENV=production
ENV BUILD_ENV=${BUILD_ENV}

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm install

# Copy source files
COPY . .

# Accept Vite environment variables as build args
ARG VITE_BASE_PATH=/
ARG VITE_API_URL
ARG VITE_APP_ENV

# Set them as environment variables for the build process
ENV VITE_BASE_PATH=${VITE_BASE_PATH}
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_APP_ENV=${VITE_APP_ENV}

# Build frontend based on environment
RUN if [ "$BUILD_ENV" = "stage" ]; then \
    npm run build:stage; \
    else \
    npm run build:prod; \
    fi

# ============================================
# Stage 2: Production Stage
# ============================================
FROM node:20-alpine

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production && \
    npm cache clean --force

# Copy built frontend from builder stage
COPY --from=builder /app/dist ./dist

# Copy server files
COPY --from=builder /app/server ./server
COPY --from=builder /app/ecosystem.config.cjs ./

# Create necessary directories
RUN mkdir -p server/db server/uploads && \
    chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3001

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=10s --retries=3 --start-period=40s \
    CMD node -e "require('http').get('http://localhost:3001/v1/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1
# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "server/index.cjs"]
