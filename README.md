# zk-mgorle-arcade game on AirChain FHEVM ecosystem

## Some useful variables
- NETWORK_URL=http://localhost:8545/
- GATEWAY_URL=http://localhost:7077


## Prereq
- docker 
- node
- go
- docker compose plugin

## How to run frontend
```bash
npm install
npm run dev
```

## How to run FHEVM using Docker

1. 
```bash
cd FHEVM
```
2.
```bash
npm install
```
3.
```bash
cp .env.example .env
```
4.
```bash
make run-full
```
5.
```bash
npm run fund
```
6.
```bash
npm run deploy
```
7.
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


