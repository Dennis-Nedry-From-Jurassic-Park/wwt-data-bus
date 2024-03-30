# simulateContract
https://viem.sh/docs/contract/simulateContract.html

```ts
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { moonbeamDev } from 'viem/chains';

const account = privateKeyToAccount('INSERT_PRIVATE_KEY');
const rpcUrl = 'http://127.0.0.1:9944';
const walletClient = createWalletClient({
    account,
    chain: moonbeamDev,
    transport: http(rpcUrl),
});


import { simulateContract } from 'viem';

// Assuming you have the contract ABI and address for Uniswap V2 Router
const uniswapV2RouterAbi = [...]; // Replace with actual ABI
const uniswapV2RouterAddress = '0x...'; // Replace with actual address

// Example parameters for a swap
const swapParams = {
  amountIn: '1000000000000000000', // 1 ETH in wei
  path: ['0x...', '0x...'], // Token addresses
  to: '0x...', // Recipient address
  deadline: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from now
};

// Simulate the swap
const simulationResult = await simulateContract({
  client: walletClient,
  contractAddress: uniswapV2RouterAddress,
  abi: uniswapV2RouterAbi,
  method: 'swapExactETHForTokens', // Example method
  args: [swapParams.amountIn, swapParams.path, swapParams.to, swapParams.deadline],
});

console.log(simulationResult);

const { request } = await client.simulateContract({
    address: NonFongiblePositionManager, // Replace with the actual contract address
    abi: NonfungiblePositionManagerABI, // Replace with the actual ABI
    functionName: 'collect',
    args: [{
        tokenId: 966995,
        recipient: account, // Replace with the actual recipient address
        amount0Max: MAX_UINT128,
        amount1Max: MAX_UINT128,
    }],
    blockNumber: BigInt(45380332), // Specify the block number if necessary
});
console.log(request);

```