```ts
const balance = await client.getBalance({
    address: '0x11fa5be01476295200cb162b952972d2c9c6c599',
    blockTag: BlockTag.latest
});

const balanceAsEther = formatEther(balance);
console.log({balanceAsEther});
```