import {promises as fsPromises} from "fs";
import {join} from "path";
import {WWT} from "./wwt";
import {Strategy} from "./types";
import {stringify} from "../../shared/lib-base";
import {BlockTag} from "../blockchain/ethereum/types";
import {unix_to_dt} from "../../shared/lib-base/src/datetime/dt";
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

const parser = async () => {
    let txs: any[]
        = require('./txs_etherscan_0x11fa5be01476295200cb162b952972d2c9c6c599.json')

    //console.log({L: txs.length});
    txs.sort((a, b) => b.timeStamp - a.timeStamp);

    const f = txs[0]
    const l = txs.at(-1)

    console.log({tx_first: f});    // 1711957727
    console.log({tx_last: l});     // 1709243843

    console.log(unix_to_dt("1711957727"));
    console.log(unix_to_dt("1709243843"));

    const obj = txs[0]

    console.log({fee_usd: 347101.199718 * 0.0338})

    // https://gweitousd.com/
    const txFee = +obj.gasPrice * 0.000000001 * +obj.gasUsed * 0.0338
    console.log({txFee});
    //Gas limit * (Base fee + Priority fee)

    const arr = [
        {
            datetime: unix_to_dt(f.timeStamp),
            from: f.from,
            to: f.to,
            coin:
        }
    ]

    console.table(arr);

}
parser();

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


    // const wwt = await WWT.create({
    //     strategy: Strategy.viem_cloudflare_eth_dev
    // });
    // const address = '0x11fa5be01476295200cb162b952972d2c9c6c599'
    // const txs = await wwt.getHistory(address);
    // await asyncWriteFile(`./txs_etherscan_${address}_getblock.json`, stringify(txs));

}
//exec1()

//