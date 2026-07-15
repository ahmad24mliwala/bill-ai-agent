# ==========================================================
# AI Bill Processing System
# Backend Dockerfile
# ==========================================================

FROM python:3.11-slim

LABEL maintainer="Ahmad Amliwala"
LABEL project="AI Bill Processing System"

# ==========================================================
# Environment Variables
# ==========================================================

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

# ==========================================================
# Install System Packages
# ==========================================================

RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# ==========================================================
# Working Directory
# ==========================================================

WORKDIR /app

# ==========================================================
# Install Python Dependencies
# ==========================================================

COPY requirements.txt .

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

# ==========================================================
# Copy Application
# ==========================================================

COPY . .

# ==========================================================
# Create Required Directories
# ==========================================================

RUN mkdir -p uploads exports

# ==========================================================
# Expose FastAPI Port
# ==========================================================

EXPOSE 8000

# ==========================================================
# Health Check
# ==========================================================

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
CMD curl -f http://localhost:8000/ || exit 1

# ==========================================================
# Start FastAPI
# ==========================================================

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
