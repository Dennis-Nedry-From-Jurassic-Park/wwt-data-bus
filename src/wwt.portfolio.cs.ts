import {asyncWriteFile, stringify} from "../shared/lib-base";

const axios = require('axios');
require('dotenv').config();

/**
 * ChainstackApi class provides methods to interact with the Chainstack API.
 * In this case it uses Axios to call the Covalent API.
 */
class ChainstackApi {
    /**
     * Constructor for the ChainstackApi class.
     * Initializes the JWT Token.
     */
    constructor() {
        this.COVALENT_JWT_TOKEN = process.env.COVALENT_JWT_TOKEN
    }

    /**
     * Fetch all transactions ever made by a wallet address on a given blockchain.
     * @param {string} chainName - The blockchain name (e.g. 'eth-mainnet').
     * @param {string} walletAddress - The wallet address to fetch transactions for.
     * @param {string} currency - The quote currency (e.g. 'USD').
     * @param {boolean} noLogs - Whether to exclude logs from the response.
     * @returns {Promise<Object>} - The transaction data.
     */

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
    const address: `0x${string}` = "0x11fa5be01476295200cb162b952972d2c9c6c599"
    try {
        // Define the settings
        const chainstack = new ChainstackApi();                              // create a new instance of the Chainstack API using the API key
        const chainName = 'eth-mainnet';                                     // define the blockchain network to fetch transactions from
        const walletAddress = address;  // define the wallet address to query transactions from
        const currency = 'USD';                                              // define the currency in which the values should be returned
        const noLogs = false;                // define whether we need to include event logs with the response. true = no logs, false = logs

        const { data: transactionsData } = await chainstack.fetchTransactions(chainName, walletAddress, currency, noLogs);
        //console.log(transactionsData);
        await asyncWriteFile(`./wwt_all_${address}.json`, stringify(transactionsData));

    } catch (error) {

        console.error('Error:', error);
    }
}

main();