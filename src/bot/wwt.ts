import {Model} from "../db/mongo/models";
import {MongoDbClient} from "../db/mongo/client";
import {Collection} from "../db/mongo/collections";
import {now_iso} from "../../shared/lib-base/src/datetime/dt";
import {Catch} from "@magna_shogun/catch-decorator";
import {OpsType, Strategy} from "./types";

const handler = (err) => {
    console.log('catch err111');
    console.log({err});
}

const CatchAll = Catch(Error, (err: any) => console.log(err.message))

//@Catch(Error, handler)
export class WWT {
    private mongoDbClient!: MongoDbClient;

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

    static async create({
                            strategy
                        }: {
                            strategy: Strategy
                        }
    ): Promise<WWT> {
        const bot = new WWT();

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


    gen_msg = (msg: any, ops: OpsType,) => {
        return {
            ts: now_iso(),
            ops: ops,
            msg: msg + ''
        }
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