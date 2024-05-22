https://data.worldbank.org/indicator/NY.GDP.MKTP.CD?year_high_desc=true
https://ethereum.stackexchange.com/questions/155767/is-there-any-way-to-get-historical-pool-data-by-interacting-with-the-pool-smart
https://docs.uniswap.org/contracts/v2/reference/API/queries



To get the historical price of a Uniswap V2 pool in USD, you'll need to follow a process that involves fetching the reserves of the tokens in the pool, converting those reserves to a price ratio, and then converting that price ratio to USD. This process requires interaction with the Ethereum blockchain through a library like `web3.py` in Python. Here's a step-by-step guide based on the information provided:

1. **Set Up Your Environment**: Ensure you have `web3.py` installed in your Python environment. If not, you can install it using pip (`pip install web3`).

2. **Connect to the Ethereum Network**: Use an Ethereum node provider like Alchemy to connect to the Ethereum network. Replace `"YOUR_ALCHEMY_API_KEY"` with your actual Alchemy API key.

    ```python
    from web3 import Web3

    w3 = Web3(Web3.HTTPProvider("https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY"))
    ```

3. **Define the Pair Contract ABI and Address**: You need the ABI (Application Binary Interface) and the contract address of the Uniswap V2 pair you're interested in. The ABI defines how to interact with the contract, and the contract address identifies the specific pair on the blockchain.

    ```python
    pair_contract_address = "0xPAIR_CONTRACT_ADDRESS_HERE"
    pair_contract_abi = [...]  # Define the ABI here
    ```

4. **Fetch the Reserves**: Call the `getReserves` function of the pair contract to get the reserves of both tokens in the pool. Adjust the `block_identifier` to fetch data from a specific block.

    ```python
    pair_contract = w3.eth.contract(address=pair_contract_address, abi=pair_contract_abi)
    reserves = pair_contract.functions.getReserves().call(block_identifier="BLOCK_NUMBER")
    ```

5. **Calculate the Price Ratio**: Divide the reserve of one token by the reserve of the other to get the price ratio. Remember to adjust for decimals, which can vary between tokens.

    ```python
    token0_reserve = reserves[1] / 10**decimals_token0  # Adjust for decimals
    token1_reserve = reserves[2] / 10**decimals_token1  # Adjust for decimals
    price_ratio = token1_reserve / token0_reserve
    ```

6. **Convert to USD**: To convert the price ratio to USD, you need the current price of the base token (e.g., ETH) in USD. This step depends on external market data, which you can obtain from various cryptocurrency price APIs.

    ```python
    eth_price_usd =...  # Fetch the current ETH price in USD from an external API
    price_in_usd = price_ratio * eth_price_usd
    ```

7. **Print the Historical Price**: Finally, print the historical price of the token in USD.

    ```python
    print(f"The historical price of {token1_symbol} in USD is approximately ${price_in_usd}")
    ```

Remember, this approach gives you the historical price of the token in relation to another token (e.g., ETH). Converting this price to USD requires knowing the current price of the base token in USD, which you can obtain from financial news websites, cryptocurrency exchanges, or dedicated APIs.

Citations:
[1] https://www.reddit.com/r/defi/comments/vthat3/scraped_uniswap_for_historical_prices_of_tokens/
[2] https://ethereum.stackexchange.com/questions/155869/getting-uniswap-v2-latest-price-and-interpreting-values-using-python
[3] https://info.uniswap.org/
[4] https://chainbulletin.com/how-to-explore-historical-defi-data
[5] https://chainstack.com/retrieve-historical-data-uniswap-v3-liquidity-pool/
[6] https://v2.info.uniswap.org/home
[7] https://tokeninsight.com/en/coins/uniswap/historical
[8] https://finance.yahoo.com/quote/UNI7083-USD/history/
[9] https://blockworks.co/price/uni
[10] https://docs.uniswap.org/contracts/v2/reference/API/queries


