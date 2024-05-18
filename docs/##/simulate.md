https://wagmi.sh/vue/api/composables/useSimulateContract

```ts
async function getTransactionResult(hash: Hex) {
  const tx = await getTransaction(publicClient, hash);
  const txReceipt = await getTransactionReceipt(publicClient, hash);
  const { functionName, args } = decodeFunctionData({ abi, data: tx.input });
  try {
    return publicClient.simulateContract({
      account: tx.from,
      address: tx.to!,
      abi,
      functionName,
      args,
      // value: tx.value, // TS doesn't like me to including this
      blockNumber: receipt.blockNumber,
      // do we need to include nonce, gas price, etc. to properly simulate?
    });
  } catch (error) {
    throw getContractError(error as BaseError, {
      abi,
      address: tx.to!,
      sender: tx.from,
      functionName,
      args,
    });
  }
}
```

