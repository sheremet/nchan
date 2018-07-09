#!/usr/bin/env sh
set -eu

envsubst '${REDIS_CLUSTER_PASSWORD}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"
