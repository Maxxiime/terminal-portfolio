FROM nginx:alpine
ENV NODE_OPTIONS="--dns-result-order=ipv4first"
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY dist/ /usr/share/nginx/html/
COPY health.sh /docker-entrypoint.d/99-generate-health.sh
COPY config.sh /docker-entrypoint.d/98-generate-runtime-config.sh
EXPOSE 80
