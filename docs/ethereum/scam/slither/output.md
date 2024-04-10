ocker run -it -v $(pwd):/share trailofbits/eth-security-toolbox:nightly-20240408 slither --detect all 0x926E7c4FAab47d7360caB19Af30fbdE05C9a7536 --print human-summary
Installing solc '0.8.10'...
Version '0.8.10' installed.
'solc --standard-json --allow-paths /home/ethsec' running
INFO:Printers:
Compiled with Etherscan
Total number of contracts in source files: 10
Source lines of code (SLOC) in source files: 766
Number of  assembly lines: 0
Number of optimization issues: 3
Number of informational issues: 34
Number of low issues: 9
Number of medium issues: 12
Number of high issues: 1
ERCs: ERC20, ERC2612

+--------------------+-------------+---------------+--------------------+--------------+--------------+
| Name               | # functions |          ERCS |         ERC20 info | Complex code |     Features |
+--------------------+-------------+---------------+--------------------+--------------+--------------+
| SafeMath           |          13 |               |                    |           No | AbiEncoderV2 |
| IUniswapV2Factory  |           8 |               |                    |           No | AbiEncoderV2 |
| IUniswapV2Pair     |          27 | ERC20,ERC2612 |          ∞ Minting |           No | AbiEncoderV2 |
|                    |             |               | Approve Race Cond. |              |              |
|                    |             |               |                    |              |              |
| IUniswapV2Router02 |           7 |               |                    |           No |  Receive ETH |
|                    |             |               |                    |              | AbiEncoderV2 |
| MOUSEX             |          56 |         ERC20 |         No Minting |          Yes |  Receive ETH |
|                    |             |               | Approve Race Cond. |              |     Send ETH |
|                    |             |               |                    |              | AbiEncoderV2 |
+--------------------+-------------+---------------+--------------------+--------------+--------------+
INFO:Slither:0x926E7c4FAab47d7360caB19Af30fbdE05C9a7536 analyzed (10 contracts)
