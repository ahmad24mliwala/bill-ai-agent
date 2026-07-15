# ==========================================================
# AI Bill Processing System
# Frontend Dockerfile
# React + Vite + Nginx
# ==========================================================

# ==========================================================
# Stage 1 - Build React Application
# ==========================================================

FROM node:22-alpine AS builder

LABEL maintainer="Ahmad Amliwala"
LABEL project="AI Bill Processing System"

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build React application
RUN npm run build

# ==========================================================
# Stage 2 - Production Nginx
# ==========================================================

FROM nginx:1.29-alpine

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy production build
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Health Check
HEALTHCHECK --interval=30s \
            --timeout=10s \
            --start-period=20s \
            --retries=3 \
CMD wget --no-verbose --tries=1 --spider http://localhost || exit 1

CMD ["nginx", "-g", "daemon off;"]
