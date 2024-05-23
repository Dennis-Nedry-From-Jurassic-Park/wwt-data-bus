import {Injectable} from '@nestjs/common';
import {Provider} from "../../../bot/provider";
import {uniswapV2Abi} from "../../../bot/abi";

@Injectable()
export class AppService {
    constructor(
        private readonly provider: Provider,
    ) {

    }

    getHello(): string {
        return 'Hello World!';
    }

    // https://ethereum.stackexchange.com/questions/155767/is-there-any-way-to-get-historical-pool-data-by-interacting-with-the-pool-smart
    priceRateConversion = async (
        address: `0x${string}`, // pool f.e. 0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
    ): Promise<any> => {
        // https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2#readContract
        const contract = await new this.provider.web3.eth.Contract(uniswapV2Abi, address)
        const result = contract.functions.slot0().call(12489829)
        //const balance = await contract.methods.getBalance().call();
        console.log(`result: ${result}`);
        return result
    }

    const Web3 = require('web3');
    const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');

// Replace with the actual price feed contract address and ABI
    const priceFeedContractAddress = '0x...';
    const priceFeedContractABI = [...]; // ABI of the price feed contract



    async getEthUsdRate() {
        return 3500 // 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 
    }
    async getPriceInUsd(tokenAddress) {
        // Construct the parameters for the price feed function call
        const params = [tokenAddress]; // Adjust according to the actual function signature
        const priceFeedContract = new this.provider.web3.eth.Contract(priceFeedContractABI, priceFeedContractAddress);
        // Perform the eth_call
        const result = await priceFeedContract.methods.getPrice(params).call();

        // Decode the result (this part depends on the ABI)
        const decodedResult = this.provider.web3.eth.abi.decodeParameters(['uint256'], result); // Example decoding

        // Convert to USD (assuming you have a function to get ETH/USD)
        const ethUsdRate = await getEthUsdRate(); // Implement this function to fetch ETH/USD rate
        const priceInUsd = decodedResult.value * ethUsdRate;

        return priceInUsd;
    }

// Example usage
    getPriceInUsd('0xYourTokenAddress').then(price => console.log(`Price in USD: ${price}`));


}
