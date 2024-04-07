import {MongoDbClient} from "../db/mongo/client";
import {Model} from "../db/mongo/models";
import {Collection} from "../db/mongo/collections";
import axios from "axios";
import {delay} from "../../shared/lib-base";
import {Type4byte} from "./types";

export class FourByte {
    private mongoDbClient_!: MongoDbClient;

    private signatures_model_: any;
    private event_signatures_model_: any;

    constructor() {

    }

    get signatures_model() {
        return this.signatures_model_;
    }

    get event_signatures_model() {
        return this.event_signatures_model_;
    }

    get mongoDbClient() {
        return this.mongoDbClient_;
    }

    static async create({}: {}): Promise<FourByte> {
        const fourByte = new FourByte();
        fourByte.mongoDbClient_ = await MongoDbClient.connect("wwt");

        await fourByte.mongoDbClient.add_model(Model.signatures, Collection.signatures);
        await fourByte.mongoDbClient.add_model(Model.eventsignatures, Collection.eventsignatures);

        fourByte.signatures_model_
            = await fourByte.mongoDbClient.get_model(Model.signatures);
        fourByte.event_signatures_model_
            = await fourByte.mongoDbClient.get_model(Model.eventsignatures);

        return fourByte
    }

    get_failed_signatures = async (
        type4byte: Type4byte,
        failed_pages: number[]
    ) => {
        let defaultUrl = ''
        let mongoModel: any

        if (type4byte === Type4byte.signatures) {
            defaultUrl = "https://www.4byte.directory/api/v1/signatures/?page="
            mongoModel = this.signatures_model
        } else if (type4byte === Type4byte.event_signatures) {
            defaultUrl = "https://www.4byte.directory/api/v1/event-signatures/?page="
            mongoModel = this.event_signatures_model
        }

        const errors: any[] = [];

        for await (const fp_num of failed_pages) {
            const url = defaultUrl + fp_num;

            await delay(1000)

            axios.get(url).then(async (result) => {
                const data = result.data.results.map(el => {
                    el.i = el.id;
                    delete el.id;
                    return el;
                })
                await mongoModel.insertMany(data)
            }).catch((error) => {
                errors.push({
                    i: fp_num,
                    error: error,
                })

                if (error?.response?.data?.detail === 'Invalid page.') {
                    console.log(errors);
                    throw Error("Stop parse. Invalid page.")
                }
            })
        }
    }

    get_signatures = async (
        type4byte: Type4byte
    ) => {
        const failed_pages: any[] = [];
        const errors: any[] = [];

        let defaultUrl = ''
        let mongoModel: any

        if (type4byte === Type4byte.signatures) {
            defaultUrl = "https://www.4byte.directory/api/v1/signatures/?page="
            mongoModel = this.signatures_model
        } else if (type4byte === Type4byte.event_signatures) {
            defaultUrl = "https://www.4byte.directory/api/v1/event-signatures/?page="
            mongoModel = this.event_signatures_model
        }

        for (let i = 1; ; ++i) {
            const url = defaultUrl + i;

            //console.log({url});
            await delay(1000)

            axios.get(url).then(async (result) => {
                //console.log({url});
                //console.log(result.data);

                const data = result.data.results.map(el => {
                    el.i = el.id;
                    delete el.id;
                    return el;
                })
                await mongoModel.insertMany(data)
            }).catch((error) => {
                errors.push({
                    i: i,
                    error: error,
                })
                failed_pages.push(i)

                if (error?.response?.data?.detail === 'Invalid page.') {
                    console.log(errors);
                    console.log(failed_pages);
                    throw Error("Stop parse. Invalid page.")
                }
            })
        }
    }
}