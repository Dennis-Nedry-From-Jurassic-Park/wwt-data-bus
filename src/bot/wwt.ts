import {Model} from "../db/mongo/models";
import {MongoDbClient} from "../db/mongo/client";
import {Collection} from "../db/mongo/collections";
import {now_iso} from "../../shared/lib-base/src/datetime/dt";
import {Catch} from "@magna_shogun/catch-decorator";
import {OpsType, Strategy} from "./types";
import {createPublicClient, http} from "viem";
import {mainnet} from "viem/chains";
import {BlockTag} from "../blockchain/ethereum/types";
import {stringify} from "../../shared/lib-base";

const handler = (err) => {
    console.log('catch err111');
    console.log({err});
}

const CatchAll = Catch(Error, (err: any) => console.log(err.message))

//@Catch(Error, handler)
export class WWT {
    private mongoDbClient!: MongoDbClient; // OR use signaldb
    private publicClient_: any

    private dataModel_: any;
    private logsModel_: any;

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

    static async create({
                            strategy
                        }: {
                            strategy: Strategy
                        }
    ): Promise<WWT> {
        const bot = new WWT();

        bot.publicClient_ = createPublicClient({
            chain: mainnet,
            transport: http(),
            // transport: http('http://localhost:8545'),
            // TODO: Erigon Arch Node
        });

        bot.mongoDbClient = await MongoDbClient.connect("wwt");

        await bot.mongoDbClient.add_model(Model.data, Collection.data);
        await bot.mongoDbClient.add_model(Model.logs, Collection.logs);

        bot.dataModel_ = await bot.mongoDbClient.get_model(Model.data)
        bot.logsModel_ = await bot.mongoDbClient.get_model(Model.logs)

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
        for (let i = 0; i < transactionCount - 704; i++) {
            try {
                const transaction = await this.publicClient.getTransaction({
                    blockTag: blockTag,
                    index: i
                });
                transactions.push(transaction);
                await this.dataModel.insertMany([{
                    ts: now_iso(),
                    address: address,
                    ops: OpsType.data,
                    test: true,
                    msg: transaction
                }]);
            } catch (err) {
                console.log(`failed fetch tx with index = ${i}`);
                transactions_failed_indexes.push(i)
            }
        }

        console.log({transactions_failed_indexes});

        return transactions
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

    disconnect = () => this.mongoDbClient.disconnect()
}