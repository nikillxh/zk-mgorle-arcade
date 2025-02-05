# zk-mgorle-arcade game on AirChain FHEVM ecosystem

## Some useful variables
- NETWORK_URL=http://localhost:8545/
- GATEWAY_URL=http://localhost:7077


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

### To check if everything is working fine
```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}' -H "Content-Type: application/json" http://localhost:8545/
```

### To stop docker container [*Important*]
```bash
make stop-full
```


