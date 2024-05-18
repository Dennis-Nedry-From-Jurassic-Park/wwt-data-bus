To retrieve the earliest transaction of an Ethereum address, you can utilize the Covalent API, which offers a straightforward method to access historical transaction data for any Ethereum address. Here's how you can do it:

1. **Use the Covalent API**: Covalent provides a comprehensive API that allows you to fetch transaction histories for Ethereum addresses. You can specifically target the earliest transaction by querying the `/v1/{chainName}/bulk/transactions/{walletAddress}/` endpoint, where `{chainName}` should be `eth-mainnet` for the Ethereum main network, and `{walletAddress}` is the Ethereum address you're interested in.

2. **Example Request**: To get the earliest transaction for an Ethereum address, you would construct a URL similar to the following:
   ```
   https://api.covalenthq.com/v1/eth-mainnet/bulk_transactions/<Ethereum_Address>/latest/
   ```
   Replace `<Ethereum_Address>` with the actual Ethereum address you're investigating.

3. **Interpret the Response**: The response from the Covalent API will contain an array of transaction objects under the `items` field. The first object in this array corresponds to the earliest transaction involving the specified address. This transaction object will include details such as the block height, transaction hash, sender and receiver addresses, transaction value, and more.

Here's a simplified example of how the response might look:
```json
{
  "chain_id": 1,
  "chain_name": "eth-mainnet",
  "items": [
    {
      "block_signed_at": "2023-10-23T16:41:35Z",
      "block_height": 18414227,
      "tx_hash": "0x6777840dae5d445f4c0b83f0916edf6302662ff9554a7d9f7beb7dcf46213782",
      "from_address": "0x51971c86b04516062c1e708cdc048cb04fbe959f",
      "to_address": "0xdc2f48410033d18c5cce2c11135fd0d40fc19aaa",
      "value": "59580000000000000",
      "value_quote": 105.1700156061255,
      "gas_offered": 100000,
      "gas_spent": 21000,
      "gas_price": 37328676560,
      "fees_paid": "783902207760000"
    }
  ]
}
```

This approach leverages the Covalent API's capability to efficiently fetch and analyze transaction data, providing a direct path to identifying the earliest transaction associated with an Ethereum address [1][4].

Citations:
[1] https://ethereum.stackexchange.com/questions/135280/is-there-a-way-to-find-out-the-first-transaction-sent-to-an-account
[2] https://stackoverflow.com/questions/71130410/how-to-check-oldest-transaction-on-ethereum-address
[3] https://docs.alchemy.com/docs/how-to-get-transaction-history-for-an-address-on-ethereum
[4] https://www.covalenthq.com/docs/unified-api/guides/how-to-get-the-earliest-transaction-history-for-an-address-on-ethereum/
[5] https://tokenview.medium.com/what-is-and-how-to-get-the-first-txn-of-crypto-wallet-address-f0f38013446d
[6] https://community.infura.io/t/how-to-get-archive-txs-by-the-eth-address/7028
[7] https://www.covalenthq.com/docs/unified-api/guides/how-to-get-transaction-history-for-an-address-on-ethereum/
[8] https://www.reddit.com/r/ethereum/comments/6qildp/what_is_the_first_ever_ethereum_transaction/
[9] https://www.cyfrin.io/blog/how-to-get-all-the-transactions-from-a-contract-address
[10] https://coinpaper.com/2662/how-to-trace-ethereum-address-owner-a-clear-guide


https://api.covalenthq.com/


https://ethereum.stackexchange.com/questions/135280/is-there-a-way-to-find-out-the-first-transaction-sent-to-an-account

The easiest way to do this is by using a service like Covalent, which provides you with an API to query the data as you would like.

I tried web3js and ethersjs and they don't have a function for you to get all the transactions sent to and from an address.

Another option is the run your own blockchain node and query it using geth client. But this one is not a simple thing.

Let's stick to a third party like Covalent for this example.

The following covalent endpoint will return all the transactions ever sent from and to the specified address.

https://api.covalenthq.com/v1/1/address/0x6827b8f6cc60497d9bf5210d602C0EcaFDF7C405/transactions_v2/

The last record in the array data.items is the first transaction. Which we can assume that it's the first transaction that sent ether to this address, because otherwise, it would not be able to send transactions itself, because it wouldn't have any balance yet.

In my Postman setup, it looks like this:

{{url}}/v1/{{chain_id}}/address/{{address}}/transactions_v2/

Where {{url}} is https://api.covalenthq.com

{{chain_id}} is 1 (which is Ethereum mainnet. Binance Smart Chain mainnet chain id is 56, etc).

{{address}} is 0x6827b8f6cc60497d9bf5210d602C0EcaFDF7C405

It returns a long json response, so I'll just put the last item in data.items:

{
"block_signed_at": "2021-10-11T00:25:12Z",
"block_height": 13394104,
"tx_hash": "0xf60f0767c87e3f8eb751e1337e7e342e964aa15401db510ba93a62d73e58feb1",
"tx_offset": 78,
"successful": true,
"from_address": "0xddfabcdc4d8ffc6d5beaf154f18b778f892a0740",
"from_address_label": "Coinbase 3",
"to_address": "0x6827b8f6cc60497d9bf5210d602c0ecafdf7c405",
"to_address_label": null,
"value": "5228110000000000",
"value_quote": 17.574775518342285,
"gas_offered": 21000,
"gas_spent": 21000,
"gas_price": 108792787426,
"fees_paid": "2284648535946000",
"gas_quote": 7.6800574505051165,
"gas_quote_rate": 3361.592529296875,
"log_events": []
}
If you check the address 0x6827b8f6cc60497d9bf5210d602C0EcaFDF7C405 in etherscan, you can actually see that at that block was the first IN transaction for this address:

https://etherscan.io/address/0x6827b8f6cc60497d9bf5210d602c0ecafdf7c405

https://etherscan.io/tx/0xf60f0767c87e3f8eb751e1337e7e342e964aa15401db510ba93a62d73e58feb1

To call a Covalent API, you will need to get an api key from them. Simply register with them and get one.

Then you simply use the api key as the 'username' in the Authentication param in the header of the http request:

enter image description here

Read their docs: https://www.covalenthq.com/docs/api/#/0/0/USD/1