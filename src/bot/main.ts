import {WWT} from "./wwt";
import {Strategy} from "./types";

const main = async () => {
    const wwt = await WWT.create({
        strategy: Strategy.viem_cloudflare_eth_dev
    });
    const blockNumber = await wwt.publicClient.getBlockNumber();
    console.log({blockNumber});
    //const data = {};
    //await wwt.save(data);
}
main()