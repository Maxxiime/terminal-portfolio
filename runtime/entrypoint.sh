#!/bin/sh
set -eu

. /usr/local/bin/portfolio-config.sh

cp /etc/portfolio/default.conf.template /etc/nginx/conf.d/default.conf

/usr/local/bin/portfolio-health.sh

node /opt/portfolio/question-api.mjs &
question_api_pid=$!

"$@" &
nginx_pid=$!

stop_services() {
  kill -TERM "$question_api_pid" "$nginx_pid" 2>/dev/null || true
  wait "$question_api_pid" "$nginx_pid" 2>/dev/null || true
}

trap stop_services INT TERM EXIT

while kill -0 "$question_api_pid" 2>/dev/null && kill -0 "$nginx_pid" 2>/dev/null; do
  sleep 1
done

exit 1
