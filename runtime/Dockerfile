FROM nginx:alpine
ENV NODE_OPTIONS="--dns-result-order=ipv4first"
RUN apk add --no-cache gettext jq
COPY nginx.conf.template /etc/portfolio/default.conf.template
COPY dist/ /usr/share/nginx/html/
COPY config.sh /usr/local/bin/portfolio-config.sh
COPY health.sh /usr/local/bin/portfolio-health.sh
COPY entrypoint.sh /usr/local/bin/portfolio-entrypoint.sh
RUN chmod +x /usr/local/bin/portfolio-entrypoint.sh /usr/local/bin/portfolio-health.sh
EXPOSE 80
ENTRYPOINT ["/usr/local/bin/portfolio-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
