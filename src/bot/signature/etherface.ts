import {delay} from "../../../shared/lib-base";
import axios from "axios";
import {MongoDbClient} from "../../db/mongo/client";
import {Model} from "../../db/mongo/models";
import {Collection} from "../../db/mongo/collections";

export class Etherface {
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

    /**
     * systemd sysvinit
     * TODO: ab-generator voice talk
     * https://github.com/ggerganov/whisper.cpp
     * https://github.com/Mozer/talk-llama-fast
     * https://explorer.globe.engineer/?q=%5B%22tarantool%22%5D
     * https://www.youtube.com/watch?v=0MEZ84uH4-E
     * https://www.youtube.com/watch?v=en6uW595DM8
     */

    /**
     * TODO: https://www.etherface.io/statisticsCodeium: Your extension version is too old. Please update to the latest version and restart your IDE. For help, contact us on Discord at https://discord.gg/3XFf78nAx5.
     * TODO: https://www.etherface.io/api-documentation
     * const etherface = await Etherface.create({});
     */
    static async create({}: {}): Promise<Etherface> {
        const etherface = new Etherface();
        etherface.mongoDbClient_ = await MongoDbClient.connect("wwt");

        await etherface.mongoDbClient.add_model(Model.etherface_signatures, Collection.etherface_signatures);

        etherface.signatures_model_ = await etherface.mongoDbClient.get_model(Model.etherface_signatures);

        return etherface
    }

    // TODO: https://api.etherface.io/v1/sources/etherscan/all/4/1
    // https://community.infura.io/t/web3-js-how-to-track-erc-20-token-transfers-specific-address-token/5571
    fn = async () => {

    }

    /**
     * search ethereum signatures by searchPattern, f.e. balanceOf or mint
     * @param model Model
     * @param searchPattern
     */
    get_signatures = async (
        model: Model,
        searchPattern: string
    ) => {
        const failed_pages: any[] = [];
        const errors: any[] = [];

        let defaultUrl = ''
        let mongoModel: any

        if (model === Model.etherface_signatures) {
            defaultUrl = `https://api.etherface.io/v1/signatures/text/all/${searchPattern}/`
            mongoModel = this.signatures_model
        } else if (model === Model.mock) {
            defaultUrl = ""
            mongoModel = this.event_signatures_model
        }

        for (let i = 1; ; ++i) {
            const url = defaultUrl + i;

            await delay(1500)

            axios.get(url).then(async (result) => {
                console.log({url});
                //console.log(result.data);

                await mongoModel.insertMany({...result.data, ...{searchPattern: searchPattern}})
            }).catch((error) => {
                errors.push({i: i, error: error,});
                failed_pages.push(i)

                console.log(errors);
                console.log(failed_pages);
                throw Error("Stop parse. Invalid page.")
            })
        }
    }
}