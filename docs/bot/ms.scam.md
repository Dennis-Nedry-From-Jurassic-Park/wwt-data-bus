# audit scam variants
https://t.me/iTokenEthereum/852780
0x28A8ce5E81e2f58cB5CcA914C3DE46A5F8B48321
# var1: slither trailofbits/eth-security-toolbox 
https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/
https://hub.docker.com/r/trailofbits/eth-security-toolbox/tags
docker pull trailofbits/eth-security-toolbox:nightly-20240408
docker run -it -v $(pwd):/share trailofbits/eth-security-toolbox:nightly-20240408 slither /share/scam.sol
 : trailofbits/eth-security-toolbox

```bash
docker run \
-it -v $(pwd):/share \
trailofbits/eth-security-toolbox:nightly-20240408 \
slither --detect all /share/scam.sol
```

```bash
docker run -it -v $(pwd):/share trailofbits/eth-security-toolbox:nightly-20240408 slither --detect all 0x28A8ce5E81e2f58cB5CcA914C3DE46A5F8B48321
```

# var2: mythril very slow
docker run -v $(pwd):/tmp mythril/myth:0.24.8 analyze /tmp/scam.sol -t 4

