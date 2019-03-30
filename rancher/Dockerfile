FROM rsheremet/nchan:1.0.0

COPY nginx.conf.template /etc/nginx/nginx.conf.template
COPY nginx.nchan.default.conf.template /etc/nginx/conf.d/default.conf.template

COPY docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]