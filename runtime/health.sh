#!/bin/sh
# Runs via /docker-entrypoint.d/ at container startup — generates /health.json

HEALTH_FILE="${PORTFOLIO_HEALTH_FILE:-/usr/share/nginx/html/health.json}"

api_key_present=false
[ -n "${AI_PROVIDER_API_KEY:-}" ] && api_key_present=true

dns_ok=false
dns_first=""
provider_host=$(printf '%s' "${AI_PROVIDER_URL:-}" | sed -E 's#^[a-zA-Z]+://##; s#/.*##')
if nslookup "${provider_host:-openrouter.ai}" > /tmp/dns.txt 2>&1; then
  dns_ok=true
  dns_first=$(grep -oE '[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+' /tmp/dns.txt | grep -v '^$' | tail -1)
fi

https_ok=false
https_status="000"
provider_origin=$(printf '%s' "${AI_PROVIDER_URL:-}" | sed -E 's#(https?://[^/]+).*#\1#')
if wget -q --spider -T 10 "${provider_origin:-https://openrouter.ai}" 2>/dev/null; then
  https_ok=true
  https_status="200"
fi

overall_ok=false
if [ "$api_key_present" = "true" ] && [ "$dns_ok" = "true" ] && [ "$https_ok" = "true" ]; then
  overall_ok=true
fi

private_context_present=false
[ -s "${AI_PRIVATE_CONTEXT_FILE:-/run/portfolio-private/.IAinformation.md}" ] && private_context_present=true

cat > "$HEALTH_FILE" <<EOF
{
  "ok": $overall_ok,
  "api_key_present": $api_key_present,
  "dns_resolution_ok": $dns_ok,
  "dns_first_result": "$dns_first",
  "outbound_https_ok": $https_ok,
  "provider_type": "${AI_PROVIDER_TYPE:-openai-compatible}",
  "provider_url": "${AI_PROVIDER_URL:-}",
  "configured_model": "${AI_PROVIDER_MODEL:-}",
  "private_context_present": $private_context_present
}
EOF
