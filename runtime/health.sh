#!/bin/sh
# Runs via /docker-entrypoint.d/ at container startup — generates /health.json

HEALTH_FILE=/usr/share/nginx/html/health.json

api_key_present=false
[ -n "${OPENROUTER_API_KEY:-}" ] && api_key_present=true

dns_ok=false
dns_first=""
if nslookup openrouter.ai > /tmp/dns.txt 2>&1; then
  dns_ok=true
  dns_first=$(grep -oE '[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+' /tmp/dns.txt | grep -v '^$' | tail -1)
fi

https_ok=false
https_status="000"
if wget -q --spider -T 10 https://openrouter.ai 2>/dev/null; then
  https_ok=true
  https_status="200"
fi

overall_ok=false
if [ "$api_key_present" = "true" ] && [ "$dns_ok" = "true" ] && [ "$https_ok" = "true" ]; then
  overall_ok=true
fi

cat > "$HEALTH_FILE" <<EOF
{
  "ok": $overall_ok,
  "api_key_present": $api_key_present,
  "dns_resolution_ok": $dns_ok,
  "dns_first_result": "$dns_first",
  "outbound_https_ok": $https_ok,
  "openrouter_https_status": "$https_status",
  "configured_model": "openrouter/free"
}
EOF
