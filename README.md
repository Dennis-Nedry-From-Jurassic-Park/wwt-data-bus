## ~~This project is not ready yet. Work in progress...~~

# audit
https://mythril-classic.readthedocs.io/en/master/installation.html
docker pull mythril/myth:0.24.8
1) mkdir tmp
2) cd /home/legion/tmp
3) copy smart contract to directory
4) open terminal in directory
```shell
docker run -v $(pwd):/tmp mythril/myth:0.24.8 analyze /tmp/scam.sol
```

docker run mythril/myth:0.24.8 analyze 
-a 0xC6b42b2A7C7b0C5Fa8C2c27e619dEfa8646735CA
--rpc localhost:port erigon
docker run -v $(pwd):/tmp mythril/myth:0.24.8 analyze tmp/scam.sol
0xC6b42b2A7C7b0C5Fa8C2c27e619dEfa8646735CA
https://etherscan.io/address/0xC6b42b2A7C7b0C5Fa8C2c27e619dEfa8646735CA#code



