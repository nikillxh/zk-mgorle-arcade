# zk-mgorle-arcade game on AirChain FHEVM ecosystem

## Some useful variables
NETWORK_URL=http://localhost:8545/
GATEWAY_URL=http://localhost:7077


## Prereq
- docker 
- node
- go
- docker compose plugin

## How to run 

```bash
cd FHEVM
```

```bash
npm install
```

```bash
cp .env.example .env
```

```bash
make run-full
```

```bash
npm run fund
```

```bash
npm run deploy
```

```bash
npm run core
```

- To stop docker container
```bash
make stop-full
```


