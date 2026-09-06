# Multi-stage Dockerfile for Cloud Run Python FastAPI Service

# Stage 1: Build & Dependency compilation
FROM python:3.11-slim AS builder

WORKDIR /build

# Install build dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends build-essential && \
    rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

# Stage 2: Minimal Runtime image
FROM python:3.11-slim AS runner

WORKDIR /app

# Ensure Python doesn't buffer stdout/stderr and does not write pyc files
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=8080 \
    PATH="/root/.local/bin:$PATH"

# Copy installed packages from builder stage
COPY --from=builder /root/.local /root/.local

# Copy application source code
COPY main.py .
COPY templates/ ./templates/
COPY static/ ./static/
COPY resources/ ./resources/

# Cloud Run injects the PORT environment variable (defaults to 8080 or 3000)
EXPOSE ${PORT}

# Run FastAPI application with Uvicorn bound to 0.0.0.0:$PORT via sh shell interpolation
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8080}"]
