import axios from 'axios';

export const Token = {
    eth: "eth",
    arb: "arb"
};
export type Token = (typeof Token)[keyof typeof Token];

export const getTokenPrice = async (
    token: Token
) => {
    try {
        const response = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${token}&tsyms=BTC,USD,EUR`);
        console.log(response.data);
        return response.data
    } catch (error) {
        console.error(error);
    }
}

async function getEthereumPriceFromCoinbase() {
    try {
        const response = await axios.get('https://api.coinbase.com/v2/prices/ETH-USD/spot');
        console.log(response.data.data.amount);
    } catch (error) {
        console.error(error);
    }
}

getEthereumPriceFromCoinbase();


async function getEthereumPriceFromEtherscan(apiKey: string) {
    try {
        const response = await axios.get(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${apiKey}`);
        console.log(response.data.result.ethusd);
    } catch (error) {
        console.error(error);
    }
}

const apiKey = 'YourApiKeyToken'; // Replace with your actual API key
getEthereumPriceFromEtherscan(apiKey);

