#!/bin/sh
set -eu

config_file=/usr/share/nginx/html/config/portfolio.json

if [ ! -r "$config_file" ]; then
  echo "Missing portfolio configuration: $config_file" >&2
  exit 1
fi

provider_url=$(jq -r '.ai.providerUrl // empty' "$config_file")
provider_model=$(jq -r '.ai.model // empty' "$config_file")
provider_type=$(jq -r '.ai.providerType // empty' "$config_file")

if [ -z "$provider_url" ] || [ -z "$provider_model" ]; then
  echo "The portfolio configuration must define ai.providerUrl and ai.model" >&2
  exit 1
fi

# These exported values are consumed by nginx's envsubst template and health.sh.
export AI_PROVIDER_URL="$provider_url"
export AI_PROVIDER_MODEL="$provider_model"
export AI_PROVIDER_TYPE="${provider_type:-openai-compatible}"
