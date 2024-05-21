import {now_iso} from "../../shared/lib-base/src/datetime/dt";
import {Catch} from "@magna_shogun/catch-decorator";
import {OpsType, Strategy, Table} from "./types";
import {createPublicClient, http} from "viem";
import {mainnet} from "viem/chains";
import {BlockTag} from "../blockchain/ethereum/types";
import {delay, stringify} from "../../shared/lib-base";
import {erc20Abi} from 'abitype/abis'

import Web3 from "web3";
import {FourByte} from "./signature/4byte";
import axios from "axios";
import {ClickHouseClient, createClickHouseClient} from "../../shared/lib-db-client";
import {v4} from "uuid";
import {GeckoTerminalApiV2} from "./price-oracles/coingecko/geckoterminal-api-v2";
import {Base} from "./base";
import {RPC} from "./rpc";
import {Provider} from "./provider";

const handler = (err) => {
    console.log('catch err111');
    console.log({err});
}

const CatchAll = Catch(Error, (err: any) => console.log(err.message))

// interface ClickHouseClient {
//     query(): void;
// }
//
// ClickHouseClient.prototype['query'] = function () {
//     alert('Stop');
// }


const SocialNetwork = (superclass) => class extends superclass {
    constructor() {
        super();
    }
    foo() {
        console.log('foo1');
    }
};
//@Catch(Error, handler)
//  mix(Base).with(SocialNetwork)
//export class WWT extends Base {
//export class WWT extends mix(Base).with(SocialNetwork) {
export class WWT extends Base {
    private clickhouse_beta_: ClickHouseClient;
    private provider_: Provider
    private publicClient_: any

    // price oracles
    private geckoTerminalApiV2_: GeckoTerminalApiV2

    private web3_: Web3

    private fourByte_: FourByte;

    constructor() {
        super();
    }

    public get clickhouse_beta() {
        return this.clickhouse_beta_;
    }

    get provider() {
        return this.provider_;
    }

    public get geckoTerminalApiV2() {
        return this.geckoTerminalApiV2_;
    }

    public get publicClient() {
        return this.publicClient_;
    }

    public get web3() {
        return this.web3_;
    }

    get fourByte() {
        return this.fourByte_;
    }

    static async create({
                            strategy
                        }: {
                            strategy: Strategy
                        }
    ): Promise<WWT> {
        const bot = new WWT();

        bot.geckoTerminalApiV2_ = new GeckoTerminalApiV2();

        bot.publicClient_ = createPublicClient({
            chain: mainnet,
            transport: http(), // TODO: Erigon Arch Node
            // transport: http('http://localhost:8545'),
        });

        bot.web3_ = new Web3(RPC.default);

        bot.fourByte_ = await FourByte.create({});

        bot.clickhouse_beta_ = createClickHouseClient({
            app: 'wwt-data-bus', host: 'localhost', port: 8123, session_id: v4(), debug: true, raw: false
        })

        process.once("SIGINT", async (err) => {
            // TODO
        });

        process.on('uncaughtException', async (err) => {
            console.error('An uncaught exception occurred:', err);
        });

        return bot
    }

    // https://github.com/0xsha/ChainWalker
    // TODO: NOT WORKING !!
    get_txs = async (
        address: string,
        blockTag: BlockTag,
    ) => {
        const transactionCount
            = await this.publicClient.getTransactionCount({address: address, blockTag: blockTag});
        console.log({transactionCount});

        const transactions = [];
        const transactions_failed_indexes = [];
        for (let i = 0; i < transactionCount; i++) {
            try {
                const transaction = await this.publicClient.getTransaction({
                    blockTag: blockTag,
                    index: i
                });
                transactions.push(transaction);
                await this.dataModel.insertMany([{
                    ts: now_iso(),
                    address: address,
                    fail: false,
                    i: i,
                    ops: OpsType.data,
                    blockTag: blockTag,
                    test: true,
                    msg: transaction
                }]);
            } catch (err) {
                console.log(`failed fetch tx with index = ${i}`);
                console.log({err});
                transactions_failed_indexes.push(i)
                await delay(1000)

            }
        }

        await this.dataModel.insertMany([{
            ts: now_iso(),
            address: address,
            fail: true,
            i: -1,
            ops: OpsType.data,
            blockTag: blockTag,
            test: true,
            msg: transactions_failed_indexes
        }]);

        console.log({transactions_failed_indexes});
        console.log({transactions_failed_indexes_len: transactions_failed_indexes.length});

        return transactions
    }

    // https://abitype.dev/guide/getting-started
    isERC20 = async (address) => { // Coin erc-20-abi
        const contract = new this.web3.eth.Contract(erc20Abi, address);
        try {
            await contract.methods.totalSupply().call();
            return true;
        } catch (error) {
            return false;
        }
    }

    isERC721 = async (address) => { // TODO: NFT
        const ERC721_ABI = [] // TODO:
        const contract = new this.web3.eth.Contract(ERC721_ABI, address);
        try {
            await contract.methods.ownerOf().call();
            return true;
        } catch (error) {
            return false;
        }
    }

    getBytecode = async (address, blockNumber?) => {
        const bytecode = await this.publicClient.getBytecode({
            address: address,
        });

        console.log(bytecode);

        return bytecode
    }

    getBalanceAtBlock = async (address, blockNumber) => {
        try {
            return await this.web3.eth.getBalance(address, blockNumber);
        } catch (error) {
            console.error(error);
        }
    };

    getERCtype = async (address) => {
        // const contract = new this.web3.eth.Contract(erc20Abi, address);
        // const is721 = await contract.methods.supportsInterface('0x80ac58cd').call();
        // if (is721) {
        //     return "ERC721";
        // }
        // const is1155 = await contract.methods.supportsInterface('0xd9b67a26').call();
        // if (is1155) {
        //     return "ERC1155";
        // }
        // return undefined;
    }

    getNextPage = async (method: string, nextPageToken: string, params: any) => {
        // https://api-docs.ankr.com/reference/post_ankr-gettransactionsbyaddress
        params.pageToken = nextPageToken
        //console.log({params})
        const response = await axios.post(RPC.ankr_axios, {
            jsonrpc: "2.0",
            id: 1,
            method: method,
            params: params, // Using nextPageToken for pagination
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            }
        });

        if (response.data.error) {
            throw Error(stringify(response.data.error))
        }

        //console.log({ data: response.data.result });

        return response.data.result;
    }

    savePaginatedPagesFor = async (method: string, params: any, table: Table) => {

    }

    savePaginatedPages = async (method: string, params: any, table: Table) => {
        let nextPageToken = "";

        do {
            const data = await this.getNextPage(method, nextPageToken, params);

            delete data["nextPageToken"];

            console.log({data});

            let address = ""

            if(method == 'ankr_getAccountBalance' || method == 'ankr_getAccountBalanceHistorical') {
                address = params.walletAddress
            } else {
                address = params.address[0]
            }

            await this.clickhouse_beta.insert({
                table: table,
                values: [
                    { timestamp: new Date(), data: data, address: address, nextPageToken: nextPageToken },
                ],
                clickhouse_settings: { // Allows to insert serialized JS Dates (such as '2023-12-06T10:54:48.000Z')
                    date_time_input_format: 'best_effort',
                },
                format: 'JSONEachRow',
            })

            nextPageToken = data.nextPageToken; // Update nextPageToken for the next iteration
            console.log({nextPageToken});
        } while (nextPageToken);
    }

    query = async (params: any): Promise<any> => {
        const result = await this.clickhouse_beta_.query(params)

        return await (await result.json()).data
    }

}


/*
import { parseAbiItem } from 'viem';

const logs = await publicClient.getLogs({
 address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // Wallet address
 event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
});

// Process logs to extract transaction information



const ethers = require('ethers');

// Replace YOUR_ETHERSCAN_API_KEY with your actual Etherscan API key
const etherscanProvider = new ethers.providers.EtherscanProvider(null, 'YOUR_ETHERSCAN_API_KEY');

// Specify the address and the start and end block numbers
const address = '0xb2682160c482eB985EC9F3e364eEc0a904C44C23';
const startBlock = 3135808;
const endBlock = 5091477;

etherscanProvider.getHistory(address, startBlock, endBlock).then(function(history) {
    console.log(history);
});

 */


/*
const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545'); // Replace with your Ethereum node endpoint

async function getTransactionHistory(accountAddress) {
    const latestBlock = await web3.eth.getBlockNumber();
    let history = [];

    for (let i = latestBlock; i >= 0; i--) {
        const block = await web3.eth.getBlock(i, true);
        block.transactions.forEach(transaction => {
            if (transaction.from === accountAddress || transaction.to === accountAddress) {
                history.push({
                    blockNumber: i,
                    transactionHash: transaction.hash,
                    from: transaction.from,
                    to: transaction.to,
                    value: web3.utils.fromWei(transaction.value, 'ether'),
                    gasPrice: web3.utils.fromWei(transaction.gasPrice.toString(), 'gwei'),
                    gasLimit: transaction.gasLimit,
                    timestamp: transaction.timestamp
                });
            }
        });

        if (history.length > 0) break; // Stop once you've found enough transactions
    }

    return history;
}

// Example usage
const accountAddress = '0xYourAccountAddressHere';
getTransactionHistory(accountAddress).then(history => console.log(history));

 */