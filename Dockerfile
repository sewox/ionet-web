# Dokploy Optimized Dockerfile
FROM node:20-alpine

# Install system dependencies
RUN apk add --no-cache dumb-init

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Install dev dependencies for build
RUN npm install --only=development

# Copy source code
COPY . .

# Build arguments for Vite
ARG VITE_BASE_PATH=/
ARG VITE_API_URL
ARG VITE_APP_ENV=staging

# Set build environment
ENV VITE_BASE_PATH=$VITE_BASE_PATH \
    VITE_API_URL=$VITE_API_URL \
    VITE_APP_ENV=$VITE_APP_ENV

# Build frontend
RUN npm run build:${VITE_APP_ENV:-stage}

# Remove dev dependencies to reduce image size
RUN npm prune --production

# Create runtime directories
RUN mkdir -p server/db server/uploads

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --retries=3 --start_period=40s \
    CMD node -e "require('http').get('http://localhost:3001/v1/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

# Start application with dumb-init
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server/index.cjs"]
