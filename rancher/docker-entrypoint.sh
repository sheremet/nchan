#!/usr/bin/env sh
set -eu
envsubst '${NCHAN_KEEPALIVE_TIMEOUT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf
envsubst '${REDIS_CLUSTER_PASSWORD} ${API_ACCOUNTS_URL} ${NCHAN_SUB_USER_MESSAGE_BUFFER_LENGTH} ${NCHAN_SUB_SHARED_MESSAGE_BUFFER_LENGTH} ${NCHAN_SUB_USER_UNSUBSCRIBE_REQUEST_COMMENT} ${NCHAN_SUB_SHARED_UNSUBSCRIBE_REQUEST_COMMENT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf


exec "$@"
