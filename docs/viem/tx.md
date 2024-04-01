```js
client.watchPendingTransactions({
    onTransactions: async (tx) => {
        tx.forEach(async (hash) => {
            try {
                const transaction = await client.getTransaction({ hash: hash });
                console.log(transaction);
            } catch (e) {
                if (e.message.includes("TransactionNotFoundError")) {
                    console.log(`Transaction ${hash} not found. Retrying...`);
                    // Implement retry logic here
                } else {
                    console.error(e);
                }
            }
        });
    },
    batch: true,
    pollingInterval: 2,
    onError: error => console.error(error)
});
```

```js
const transaction = await publicClient.getTransaction({
 blockNumber: 69420n, 
 index: 0
});

const transaction = await publicClient.getTransaction({
    blockHash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
    index: 0
});

const transaction = await publicClient.getTransaction({
    blockTag: 'safe',
    index: 0
});

const transaction = await publicClient.getTransaction({
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d'
});
```