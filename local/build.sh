#!/bin/sh

# api-accounts image
NCHAN_VERSION=1.0.0
name=rsheremet/pubsub-bus-local
version=${NCHAN_VERSION}

while [ $# -gt 0 ]; do
  VALUE="${1#*=}"
  case "$1" in
    --version=*)
      version=${VALUE}
      ;;
    --help)
      echo "Please add version --version=YOUR_TAG_VERSION"
      ;;
    *)
      printf "* Error: Invalid token. Please use --help for manual*"
      exit 1
  esac
  shift
done

# Init dirs
echo "Build image..."
# Build api-accounts image
docker build -t "${name}:${version}" .
echo "Build end"


