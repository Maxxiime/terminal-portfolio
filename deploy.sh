#!/bin/sh
set -e

# Build frontend
echo "[1/3] Building frontend..."
cd src
npm install
npm run build
cd ..

# Sync dist to runtime
echo "[2/3] Syncing dist to runtime..."
rsync -a --delete src/dist/ runtime/dist/

# Rebuild and restart container
echo "[3/3] Deploying container..."
docker compose down
docker compose up -d --build

echo "Done — running on port ${PORT:-3012}"
