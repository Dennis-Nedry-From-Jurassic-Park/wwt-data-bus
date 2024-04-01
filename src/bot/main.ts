import {WWT} from "./wwt";
import {Strategy} from "./types";

const main = async () => {
    const wwt = await WWT.create({
        strategy: Strategy.viem_cloudflare_eth_dev
    });
    await wwt.error_test();

    //const data = {};
    //await wwt.save(data);
}
main()