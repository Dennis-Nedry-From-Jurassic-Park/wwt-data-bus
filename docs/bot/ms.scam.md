https://smock.readthedocs.io/en/latest/fakes.html#initialization

# audit scam variants
https://t.me/iTokenEthereum/852780
0x28A8ce5E81e2f58cB5CcA914C3DE46A5F8B48321
0x60B02881e3880001822Db823Aa76E37976D1FE85
0x5ABbDae4e6d7c89640129E87409C8F991CeE5174

docker run -it -v $(pwd):/share trailofbits/eth-security-toolbox:nightly-20240408 slither --detect all 0x926E7c4FAab47d7360caB19Af30fbdE05C9a7536 --print human-summary
**0x926E7c4FAab47d7360caB19Af30fbdE05C9a7536** 59 results
# var1: slither trailofbits/eth-security-toolbox 
https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/
https://hub.docker.com/r/trailofbits/eth-security-toolbox/tags
docker pull trailofbits/eth-security-toolbox:nightly-20240408
docker run -it -v $(pwd):/share trailofbits/eth-security-toolbox:nightly-20240408 slither /share/scam.sol
 : trailofbits/eth-security-toolbox

https://github.com/crytic/slither/wiki/Printer-documentation#human-summary

```bash
docker run \
-it -v $(pwd):/share \
trailofbits/eth-security-toolbox:nightly-20240408 \
slither --detect all /share/scam.sol \
--print human-summary
```

```bash
docker run -it -v $(pwd):/share trailofbits/eth-security-toolbox:nightly-20240408 slither --detect all 0x28A8ce5E81e2f58cB5CcA914C3DE46A5F8B48321
```

# var2: mythril very slow
docker run -v $(pwd):/tmp mythril/myth:0.24.8 analyze /tmp/scam.sol -t 4


https://habr.com/ru/companies/pt/articles/804861/
https://habr.com/ru/companies/pt/articles/786078/