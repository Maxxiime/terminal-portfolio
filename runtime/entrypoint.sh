#!/bin/sh
set -eu

. /usr/local/bin/portfolio-config.sh

envsubst '${AI_PROVIDER_URL} ${AI_PROVIDER_API_KEY}' \
  < /etc/portfolio/default.conf.template \
  > /etc/nginx/conf.d/default.conf

/usr/local/bin/portfolio-health.sh

exec "$@"
