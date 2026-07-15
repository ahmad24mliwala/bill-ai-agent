# ==========================================
# AI Bill Processing System
# Backend Dockerfile
# ==========================================

FROM python:3.11-slim

LABEL maintainer="Ahmad Amliwala"
LABEL project="AI Bill Processing System"

# ------------------------------------------
# Environment Variables
# ------------------------------------------

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PIP_NO_CACHE_DIR=1

# ------------------------------------------
# System Packages
# ------------------------------------------

RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# ------------------------------------------
# Working Directory
# ------------------------------------------

WORKDIR /app

# ------------------------------------------
# Install Python Dependencies
# ------------------------------------------

COPY requirements.txt .

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

# ------------------------------------------
# Copy Project
# ------------------------------------------

COPY . .

# ------------------------------------------
# Create Required Directories
# ------------------------------------------

RUN mkdir -p uploads exports

# ------------------------------------------
# Expose Port
# ------------------------------------------

EXPOSE 8000

# ------------------------------------------
# Health Check
# ------------------------------------------

HEALTHCHECK --interval=30s \
            --timeout=10s \
            --start-period=30s \
            --retries=3 \
CMD curl -f http://localhost:8000/ || exit 1

# ------------------------------------------
# Start Application
# ------------------------------------------

CMD [
    "uvicorn",
    "app.main:app",
    "--host",
    "0.0.0.0",
    "--port",
    "8000"
]
