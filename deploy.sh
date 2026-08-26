#!/bin/sh
set -e

# Validate runtime configuration before spending time on the frontend build.
echo "[1/4] Validating config/portfolio.json..."
node -e 'const fs = require("fs"); try { JSON.parse(fs.readFileSync("config/portfolio.json", "utf8")); } catch (error) { console.error("Invalid config/portfolio.json. This file must be strict JSON: // and /* */ comments are not allowed.\n" + error.message); process.exit(1); }'

# Build frontend
echo "[2/4] Building frontend..."
cd src
HUSKY=0 npm ci
npm run build
cd ..

# Sync dist to runtime
echo "[3/4] Syncing dist to runtime..."
rsync -a --delete src/dist/ runtime/dist/

# Rebuild and restart container
echo "[4/4] Deploying container..."
docker compose down
docker compose up -d --build

echo "Done — running on port ${PORT:-3012}"
