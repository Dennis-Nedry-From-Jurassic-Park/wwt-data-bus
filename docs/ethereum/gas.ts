const axios = require('axios');

// EIP-1559
export async function getCurrentGasPrices() {
    try {
        const response = await axios.get('https://app.defisaver.com/api/gas-price/current');
        const prices = {
            low: response.data.cheap / 10,
            medium: response.data.regular / 10,
            high: response.data.fast / 10
        };
        console.log(`Current ETH Gas Prices (in GWEI):`);
        console.log(`Low: ${prices.low} (transaction completes in < 30 minutes)`);
        console.log(`Standard: ${prices.medium} (transaction completes in < 5 minutes)`);
        console.log(`Fast: ${prices.high} (transaction completes in < 2 minutes)`);
        return prices;
    } catch (error) {
        console.error('Error fetching gas prices:', error);
    }
}


// var web3 = new Web3(account, "Ethereum endpoint");
// var routerContract = web3.Eth.GetContract(uniswapV3RouterAbi, uniswapV3RouterAddress);
// var swapFunction = routerContract.GetFunction("exactInputSingle");
//
// // Encode parameters for the swap
// var swapParams = new
// {
//     tokenIn = "0xTokenInAddress",
//     tokenOut = "0xTokenOutAddress",
//     fee = new BigInteger(500),
//     recipient = "0xYourAddress",
//     deadline = new BigInteger(DateTimeOffset.UtcNow.AddMinutes(3).ToUnixTimeSeconds()),
//     amountIn = new BigInteger(0.2 * BigInteger.Pow(10, 18)), // Assuming 18 decimals
//     amountOutMinimum = new BigInteger(0),
//     sqrtPriceLimitX96 = new BigInteger(0)
// };
//
// var encodedFunctionParams = swapFunction.GetData(swapParams);
//
// // Estimate gas
// var gas = await swapFunction.EstimateGasAsync(encodedFunctionParams);
