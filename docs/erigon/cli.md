# windows10
# https://erigon.gitbook.io/erigon/advanced-usage/configure-erigon
# mainnet
./build/bin/erigon --config ./sepolia.config.yaml --chain=sepolia --verbosity=5


```bash
./build/bin/erigon  --internalcl --datadir="<your_mainnet_data_path>" --chain=mainnet --port=30303 --http.port=8545 --authrpc.port=8551 --torrent.port=42069 --private.api.addr=127.0.0.1:9090 --http --ws --http.api=eth,debug,net,trace,web3,erigon
```
# sepolia
```bash
./build/bin/erigon  --internalcl --datadir="<your_sepolia_data_path>" --chain=sepolia --port=30304 --http.port=8546 --authrpc.port=8552 --torrent.port=42068 --private.api.addr=127.0.0.1:9091 --http --ws --http.api=eth,debug,net,trace,web3,erigon
```

# trash
./build/bin/erigon
./build/bin/erigon  --internalcl --datadir="<your_sepolia_data_path>" --chain=sepolia --port=30304 --http.port=8546 --authrpc.port=8552 --torrent.port=42068 --private.api.addr=127.0.0.1:9091 --http --ws --http.api=eth,debug,net,trace,web3,erigon
./build/bin/erigon    --authrpc.port=8552 --torrent.port=42068

# Geth
https://github.com/ledgerwatch/erigon/blob/master/node/config.go#L76-L80
Erigon does not support IPC (Inter-Process Communication)
Using Geth, I could specify the path via the optional argument **--ipcpath**.

# Q?? no ipc ?? 
IPC - is the way to solve 64k ports exhausing problem
https://github.com/ledgerwatch/erigon/issues/8588
# https://github.com/ledgerwatch/erigon/issues/3281
# https://github.com/ledgerwatch/erigon/issues/3281#issuecomment-1016454121


https://github.com/volsa/etherface
https://hub.docker.com/r/rss3/etherface/tags

./build/bin/erigon --config-file ./mainnet.config.yaml

--chain=sepolia
--snapshots false


https://github.com/ledgerwatch/erigon/issues/4091


