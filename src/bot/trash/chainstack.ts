// @ts-nocheck

// .env
// COVALENT_JWT_TOKEN=your_jwt_token_here

const axios = require('axios');
require('dotenv').config();

class ChainstackApi {
    constructor() {
        this.COVALENT_JWT_TOKEN = process.env.COVALENT_JWT_TOKEN;
    }

    async fetchTransactions(chainName, walletAddress, currency, noLogs) {
        try {
            const response = await axios.get(`https://api.covalenthq.com/v1/${chainName}/address/${walletAddress}/transactions_v2/?quote-currency=${currency}&no-logs=${noLogs}`, {
                headers: {
                    'Authorization': `Bearer ${this.COVALENT_JWT_TOKEN}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching transactions:', error);
            throw error;
        }
    }
}

async function main() {
    try {
        const chainstack = new ChainstackApi();
        const chainName = 'eth-mainnet';
        const walletAddress = '0x48D46B9E4093ebED3E269454975A433EeA08d5eA';
        const currency = 'USD';
        const noLogs = true;

        const { data: transactionsData } = await chainstack.fetchTransactions(chainName, walletAddress, currency, noLogs);
        console.log(transactionsData);
    } catch (error) {
        console.error('Error:', error);
    }
}

//main();
