#!/bin/sh
set -eu

cat > /usr/share/nginx/html/runtime-config.json <<EOF
{
  "person": {
    "name": "${PORTFOLIO_NAME:-}",
    "firstName": "${PORTFOLIO_FIRST_NAME:-}",
    "terminalHost": "${PORTFOLIO_TERMINAL_HOST:-}"
  },
  "ai": { "model": "${AI_PROVIDER_MODEL:-}" },
  "content": {
    "mode": "${CONTENT_MODE:-}",
    "github": {
      "owner": "${CONTENT_GITHUB_OWNER:-}",
      "repo": "${CONTENT_GITHUB_REPO:-}",
      "ref": "${CONTENT_GITHUB_REF:-}",
      "path": "${CONTENT_GITHUB_PATH:-}"
    },
    "http": {
      "baseUrl": "${CONTENT_HTTP_BASE_URL:-}",
      "versionUrl": "${CONTENT_HTTP_VERSION_URL:-}"
    },
    "local": {
      "baseUrl": "${CONTENT_LOCAL_BASE_URL:-}",
      "versionUrl": "${CONTENT_LOCAL_VERSION_URL:-}"
    }
  }
}
EOF
