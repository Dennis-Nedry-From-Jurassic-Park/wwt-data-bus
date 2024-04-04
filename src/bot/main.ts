import {promises as fsPromises} from "fs";
import {join} from "path";
import {WWT} from "./wwt";
import {Strategy} from "./types";
import {stringify} from "../../shared/lib-base";
import {BlockTag} from "../blockchain/ethereum/types";
//main()
//import {BlockTag} from 'ethers'; //^v6

async function asyncWriteFile(filename: string, data: any) {
    /**
     * flags:
     *  - w = Open file for reading and writing. File is created if not exists
     *  - a+ = Open file for reading and appending. The file is created if not exists
     */
    try {
        await fsPromises.writeFile(join(__dirname, filename), data, {
            flag: 'w',
        });

        const contents = await fsPromises.readFile(
            join(__dirname, filename),
            'utf-8',
        );
        //console.log(contents);

        return contents;
    } catch (err) {
        console.log(err);
        return 'Something went wrong';
    }
}

const main = async () => {
    const wwt = await WWT.create({
        strategy: Strategy.viem_cloudflare_eth_dev
    });
    // const blockNumber = await wwt.publicClient.getBlockNumber({
    //     blockTag: BlockTag.latest
    // });
    //
    // const block = await wwt.publicClient.getBlock({
    //     blockNumber: blockNumber
    // });
    //
    // console.log({blockNumber});
    // console.log({block});
    // await asyncWriteFile("./blocks.json", stringify(block));
    // await wwt.save_data([{
    //     ts: now_iso(),
    //     blockNumber: blockNumber,
    //     ops: OpsType.data,
    //     msg: stringify(block)
    // }]);

    const address = '0x11fa5be01476295200cb162b952972d2c9c6c599'
    const txs = await wwt.get_txs(address, BlockTag.finalized);
    await asyncWriteFile(`./txs_all_${address}.json`, stringify(txs));
    // await wwt.save_data([{
    //     ts: now_iso(),
    //     address: address,
    //     ops: OpsType.data,
    //     msg: stringify(txs)
    // }]);
}

const exec1 = async () => {

    // (async () => {
    //     // Specify the Ethereum node URL
    //     //const env = "https://eth-mainnet.g.alchemy.com/v2/A";
    //     const env = "https://cloudflare-eth.com";
    //     // Create a new provider instance
    //     const provider = new ethers.JsonRpcProvider(env);
    //     // Fetch the block with transactions
    //     const block = await provider.getBlock("latest", true);
    //     // Log the transactions included in the block
    //     console.log('transactions', block.transactions);
    // })();
    const wwt = await WWT.create({
        strategy: Strategy.viem_cloudflare_eth_dev
    });
    const address = '0x11fa5be01476295200cb162b952972d2c9c6c599'
    const txs = await wwt.getHistory(address);
    await asyncWriteFile(`./txs_etherscan_${address}.json`, stringify(txs));

}
exec1();


//