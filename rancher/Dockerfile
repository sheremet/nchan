FROM rsheremet/nchan:1.0.0

COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.nchan.default.conf.template /etc/nginx/conf.d/default.conf.template

COPY docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]