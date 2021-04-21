![logo](assets/logo.png)

# Cryptoapi
> Proxy and collect crypto api data

* [x] Cryptocompare 
* [ ] Coinmarketcap

## Init

### Clone
```
git clone https://github.com/rhrn/cryptoapi.git
cd cryptoapi
cp .env.default .env # edit .env to configure
```

### Quick start with `docker`
```
docker-compose -f docker-compose.yaml -f docker-compose.yugabyte.yaml build
docker-compose -f docker-compose.yaml -f docker-compose.yugabyte.yaml up
```

## Dev

### Launch local database `yugabyte`
```
docker-compose -f docker-compose.yugabyte.yaml up -d
```

### Install
```
npm install
```

### Launch db migration
```
npx prisma migrate deploy
```

### Run
```
npm run dev
```

### Run test
```
PGDB_URL=postgres://postgres@localhost:5433/cryptoapi_test npx prisma migrate deploy
PGDB_URL=postgres://postgres@localhost:5433/cryptoapi_test npm test
```

## Request examples

### Http by `curl`
```
curl "http://localhost:3000/cryptocompare?fsyms=BTC&tsyms=USD"
```

### Websocket by `wscat`
```
wscat -c ws://localhost:3000/cryptocompare
> {"message": "prices", "fsyms": ["BTC"], "tsyms": ["USD"] }
```

## Test build
```
docker build -t cryptoapi .
```

## Misc
### SQL yugabyte console
```
docker exec -it yb-tserver-n1 /home/yugabyte/bin/ysqlsh -h yb-tserver-n1 -d cryptoapi
```

### Stack
- platform: [nodejs](https://nodejs.org)
- lang: [typescript](https://www.typescriptlang.org/)
- server: [uWebSockets.js](https://github.com/uNetworking/uWebSockets.js)
- db: [yugabyte](https://www.yugabyte.com/)
- orm: [prisma](https://www.prisma.io/)
- validation: [ajv](https://ajv.js.org/)
- test: [jest](https://jestjs.io/), [pollyjs](https://netflix.github.io/pollyjs/#/)
- logger: [pino](https://getpino.io/#/)
