# nchan.io

Nchan Publish/Subscribe server (Pub/Sub). 
Original documentation for server on: https://nchan.io/

**Note**: All paths related to root of this repository

## Build

### Build Locally:

```bash
cd local
./build.sh
```

### Build on virtual machine(VM):

```bash
cd vm
./build.sh
```

### Build for Rancher:

```bash
cd rancher
./build.sh
```

### Push to Docker registry

Login to Docker registry:

```bash
docker login -u "USERNAME" -p "PASSWORD or TOKEN"
```

Push to Docker registry:

```bash
docker push FULL_NAME_OF_THE_IMAGE
```

## Run

### Locally:
Go to `local` dir
```bash
cd local
```
Run:
```bash
docker-compose up
```
Stop:
```bash
Ctrl+C
```

Remove:
```bash
docker-compose down
```

### Rancher

Run Redis Cluster:

```bash
cd rancher/redis-cluster
docker-compose up
```

Run Nchan:

 ```bash
 cd rancher
 docker-compose up
 ```

Available env variables:
```bash
REDIS_CLUSTER_PASSWORD=RedisClusterPassword
API_ACCOUNTS_URL=api-accounts
NCHAN_KEEPALIVE_TIMEOUT=
NCHAN_SUB_USER_MESSAGE_BUFFER_LENGTH=
NCHAN_SUB_SHARED_MESSAGE_BUFFER_LENGTH=
```

## Demo client:

Install globally:

```bash
npm i -g http-server
cd html
http-server -p 9000
```

Go to:
http://127.0.0.1:9000 