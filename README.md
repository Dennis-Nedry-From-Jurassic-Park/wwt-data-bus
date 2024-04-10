## ~~This project is not ready yet. Work in progress...~~
# audit
- [x] mythril. very slow
- [] slyther trailofbits/eth-security-toolbox
- [] sourcify

# audit var1 : mythril
https://mythril-classic.readthedocs.io/en/master/installation.html
docker pull mythril/myth:0.24.8
1) mkdir tmp
2) cd /home/legion/tmp
3) copy smart contract to directory
4) open terminal in directory
```shell
docker run -v $(pwd):/tmp mythril/myth:0.24.8 analyze /tmp/scam.sol -t 4
```
TODO: Добавить S3 + запуск через bash-script

docker run mythril/myth:0.24.8 analyze 
-a 0xC6b42b2A7C7b0C5Fa8C2c27e619dEfa8646735CA
--rpc localhost:port erigon
docker run -v $(pwd):/tmp mythril/myth:0.24.8 analyze tmp/scam.sol
0xC6b42b2A7C7b0C5Fa8C2c27e619dEfa8646735CA
https://etherscan.io/address/0xC6b42b2A7C7b0C5Fa8C2c27e619dEfa8646735CA#code

# AUDIT SC SMART CONTRACT SRC
https://github.com/smartbugs/smartbugs
https://ar5iv.labs.arxiv.org/html/2105.10426
# audit var0 : eth-security-toolbox
https://hub.docker.com/r/trailofbits/eth-security-toolbox/tags
```shell
docker pull trailofbits/eth-security-toolbox:nightly-20240408
```
```shell
docker run -it -v $(pwd):/share trailofbits/eth-security-toolbox:nightly-20240408 slither /share/scam.sol
```
# audit var1 : sourcify
https://github.com/ethereum/sourcify/pkgs/container/sourcify%2Fserver
https://github.com/ethereum/sourcify/blob/staging/services/server/.env.dev
https://sourcify.dev/server/api-docs/#/Session%20Verification/post_session_verify_etherscan

```shell
docker pull ghcr.io/ethereum/sourcify/server:1.5.6-amd64
```
```shell
docker run \
-p 5555:5555 \
-v path/to/custom/sourcify-chains.json:/home/app/services/server/dist/sourcify-chains.json \
-v path/to/custom/config.js:/home/app/services/server/dist/config/local.js \
--env-file .env \
ghcr.io/ethereum/sourcify/server:1.5.6-amd64
```
```shell
docker run -p 5555:5555 ghcr.io/ethereum/sourcify/server:1.5.6-amd64
```
# sourcify swagger 
https://sourcify.dev/server/api-docs/#/Session%20Verification/post_session_verify_etherscan
https://sourcify.dev/server/api-docs/#/Stateless%20Verification/post_verify_solc_json
https://playground.sourcify.dev/?address=0xb36c99e9a86ff467bbf4312ae852874f7a6fe57d&chainId=69



# ??
https://github.com/ethereumjs/ethereumjs-monorepo
