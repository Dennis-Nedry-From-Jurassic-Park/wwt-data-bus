import {Model} from "../db/mongo/models";
import {MongoDbClient} from "../db/mongo/client";
import {Collection} from "../db/mongo/collections";
import {now_iso} from "../../shared/lib-base/src/datetime/dt";
import {Catch} from "@magna_shogun/catch-decorator";
import {OpsType, Strategy} from "./types";
import {createPublicClient, http} from "viem";
import {mainnet} from "viem/chains";
import {BlockTag} from "../blockchain/ethereum/types";
import {delay, stringify} from "../../shared/lib-base";
import {ethers, EtherscanProvider} from "ethers";
import {erc20Abi} from 'abitype/abis'

import Web3 from "web3";
import {FourByte} from "./4byte";

const handler = (err) => {
    console.log('catch err111');
    console.log({err});
}

const CatchAll = Catch(Error, (err: any) => console.log(err.message))

//@Catch(Error, handler)
export class WWT {
    private mongoDbClient!: MongoDbClient; // OR use signaldb
    private publicClient_: any
    private etherscanProvider_: EtherscanProvider
    private provider_: any
    private providerGetBlock_: any

    private web3_: Web3

    private dataModel_: any;
    private logsModel_: any;

    private fourByte_: FourByte;

    constructor() {
    }

    public get dataModel() {
        return this.dataModel_;
    }

    public get logsModel() {
        return this.logsModel_;
    }

    public get publicClient() {
        return this.publicClient_;
    }

    public get etherscanProvider() {
        return this.etherscanProvider_;
    }

    public get provider() {
        return this.provider_;
    }

    public get providerGetBlock() {
        return this.providerGetBlock_;
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

        bot.publicClient_ = createPublicClient({
            chain: mainnet,
            transport: http(), // TODO: Erigon Arch Node
            // transport: http('http://localhost:8545'),
        });

        const etherscanProviderApiKey = process.env.WWT_ETHERSCAN

        if (!etherscanProviderApiKey) {
            throw Error("etherscanProviderApiKey is " + etherscanProviderApiKey)
        }

        // TODO: https://docs.etherscan.io/api-endpoints/accounts#get-a-list-of-normal-transactions-by-address
        bot.etherscanProvider_
            = new EtherscanProvider("homestead", etherscanProviderApiKey);

        const RPC = 'https://cloudflare-eth.com'

        bot.provider_ = new ethers.JsonRpcProvider(RPC);
        bot.providerGetBlock_ = new ethers.JsonRpcProvider("https://go.getblock.io/eaf591696c17440fbb7f9550f0bdd91d");

        bot.web3_ = new Web3(RPC);

        bot.mongoDbClient = await MongoDbClient.connect("wwt");

        bot.fourByte_ = await FourByte.create({});

        await bot.mongoDbClient.add_model(Model.data, Collection.data);
        await bot.mongoDbClient.add_model(Model.logs, Collection.logs);

        bot.dataModel_ = await bot.mongoDbClient.get_model(Model.data);
        bot.logsModel_ = await bot.mongoDbClient.get_model(Model.logs);

        await bot.save({
            ts: now_iso(),
            ops: "log",
            msg: strategy
        })

        process.once("SIGINT", async (err) => {
            await bot.disconnect()
        });

        process.on('uncaughtException', async (err) => {
            console.error('An uncaught exception occurred:', err);
            await bot.error(err)
        });

        return bot
    }

    get_txs = async (
        address: string,
        blockTag: BlockTag,
    ) => {
        const transactionCount
            = await this.publicClient.getTransactionCount({address: address, blockTag: blockTag});
        // { transactionCount: 695 }
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

    async getHistory(address: string, startBlock?: BlockTag, endBlock?: BlockTag): Promise<Array<any>> {
        const params = {
            action: "txlist",
            address,
            startblock: ((startBlock == null) ? 0 : startBlock),
            endblock: ((endBlock == null) ? 99999999 : endBlock),
            sort: "asc"
        };

        return this.etherscanProvider.fetch("account", params);
    }

    gen_msg = (msg: any, ops: OpsType,) => {
        return {
            ts: now_iso(),
            ops: ops,
            msg: stringify(msg)
        }
    }

    save_data = async (data: any[],) => {
        await this.dataModel.insertMany(data);
    }

    save = async (data: any,) => {
        await this.dataModel.insertMany([this.gen_msg(
            data, OpsType.data
        )]);
    }

    error = async (
        err: any,
    ) => {
        await this.logsModel.insertMany([this.gen_msg(err, OpsType.err)]);
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

    get_internal_txs = async (transactionHash: string) => {

// The transaction hash you want to trace

// Use the debug_traceTransaction method
        // Error: could not coalesce error (error={ "code": -32601, "message": "Method not found" }

        // error: {
        //     code: -32000,
        //         message: 'required historical state unavailable (reexec=128)'
        // },

        this.providerGetBlock.send("debug_traceTransaction", [transactionHash, {}])
            .then(result => {
                console.log(result);
                return result
            })
            .catch(error => {
                console.error(error);
            });

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
            const balance = await this.web3.eth.getBalance(address, blockNumber);
            return balance;
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

    checkERC20_0 = async (address: string) => {
        const tokenContract: any = new ethers.Contract(address, erc20Abi, this.provider);

        tokenContract.balanceOf(address).then(balance => {
            console.log(`Balance: ${ethers.formatUnits(balance, 18)}`);
            console.log("This address is likely an ERC-20 token.");
        }).catch(error => {
            console.error(error);
            console.error("Error fetching balance:", error);
        });

        /* TODO:
        code: 'BAD_DATA',
  value: '0x',
  info: { method: 'balanceOf', signature: 'balanceOf(address)' },
  shortMessage: 'could not decode result data'
         */
    }

    checkERC20 = async (address: string) => {
        try {
            // TODO: @ethersproject/abiиз ethersпакета , abi-decoderили ethereum-input-data-decoder.
            const contract: any = new ethers.Contract(address, erc20Abi, this.provider);

            // Check if the contract implements the ERC-20 standard
            // TODO: Error: could not decode result data (value="0x", info={ "method": "decimals", "signature": "decimals()" }, code=BAD_DATA, ve

            const decimals = await contract.decimals();
            const name = await contract.name();
            const symbol = await contract.symbol();

            console.log(`Decimals: ${decimals}`);
            console.log(`Name: ${name}`);
            console.log(`Symbol: ${symbol}`);

            console.log("This address is likely an ERC-20 token.");
        } catch (error) {
            console.error(error);
            console.error("This address is not an ERC-20 token or the contract does not implement the required functions.");
        }
    };

    disconnect = () => this.mongoDbClient.disconnect()
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