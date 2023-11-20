import {Blast, BlastNetwork, BlastSubscriptionPlan, BlastConfig} from "@bwarelabs/blast-sdk-js";

const config: BlastConfig = {
    projectId: process.env.WWT_BLAST_PROJECT_ID,
    network: BlastNetwork.ETH_MAINNET,
    rateLimit: BlastSubscriptionPlan.Free,
};
const blast = new Blast(config);

// process.env.WWT_BLAST_WSS_ENDPOINT
// process.env.WWT_BLAST_RPC_ENDPOINT

export class TradeBot {
    private readonly _config: BlastConfig;
    private readonly _blast: Blast;

    constructor({ network } : { network: BlastNetwork }) {
        this._config = {
            projectId: process.env.WWT_BLAST_PROJECT_ID,
            network: network,
            rateLimit: BlastSubscriptionPlan.Free,
        };
        this._blast = new Blast(this.config);
    }

    get config () {
        return this._config
    }
    get blast () {
        return this._blast
    }

    gasPrice = async () => {
        const gasPrice = await blast.apiProvider.eth.getGasPrice();
        console.log(new Date().toLocaleString());
        console.log(gasPrice);
    }
}

const exec = async () => {
    const bot = new TradeBot({ network: BlastNetwork.ETH_MAINNET })
    //await bot.gasPrice()

    const gasPrice = await blast.wsProvider


    try {
        const result = await bot.blast.builder.getTransaction('0x067ce4942cb3c65fe74e21063c35f786eb666712ba5d074d2dff56a6d28c1ba3')
        console.log(result)
    } catch (err) {
        console.log(err);
    }
    
    

}
exec();