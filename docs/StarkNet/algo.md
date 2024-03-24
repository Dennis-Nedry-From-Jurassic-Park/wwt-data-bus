https://starknet.drpc.org
wss://starknet.drpc.org

https://drpc.org/chainlist/starknet

```ts
const Web3 = require('web3');

const url = "https://starknet.drpc.org" // url string

const web3 = new Web3(new Web3.providers.HttpProvider(url));

web3.eth.getBlockNumber((error, blockNumber) => {
    if(!error) {
        console.log(blockNumber);
    } else {
        console.log(error);
    }
});

```