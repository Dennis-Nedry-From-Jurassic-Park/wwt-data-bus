import {WWT} from "./wwt";
import {Strategy} from "./types";
import {asyncWriteFile, stringify} from "../../shared/lib-base";
//import {BlockTag} from "blockchain/ethereum/types";
import {unix_to_dt} from "../../shared/lib-base/src/datetime/dt";
import {FourByte} from "./signature/4byte";
import {formatEther} from "viem";
import {BlockTag} from "../blockchain/ethereum/types";

/*
https://coderstower.com/2021/02/15/java-concurrency-concurrency-and-parallelism/
https://stokito.wordpress.com/2015/08/02/concurrency-kinds/
https://aws.amazon.com/ru/compare/the-difference-between-throughput-and-latency/

 */

const main = async () => {
    // 0x2a552844353579636085097082041a0303bb58be -> 5.2eth
    const address: `0x${string}` = '0x11fa5be01476295200cb162b952972d2c9c6c599'
    let txs: any[]
        = require(`./txs_etherscan_${address}.json`);
    //txs.sort((a, b) => b.timeStamp - a.timeStamp);

    const methodIds_ = txs.map((it) => {
        return it.methodId
    })
    const methodIds = [...new Set(methodIds_)]
    console.log({methodIds});

    // watch_tg_invmru_2f69f1b
    //console.log(txs[1]);
    const f = txs[0]
    const l = txs.at(-1)

    //console.log({f});
    //console.log({l});


    //const balanceStart = await wwt.getBalanceAtBlock(address, 19335995)
    //const balanceEnd = await wwt.getBalanceAtBlock(address, 19559603)


    // { balanceStart: 5200000000000000000n }
    // { balanceEnd:  32738421356030937544n }


    //console.log({balanceEnd});
    //console.log({balanceStart});

    //console.log({balanceEnd: formatEther(balanceEnd)});
    //console.log({balanceStart: formatEther(balanceStart)});

    //console.log({balance: formatEther(10200000000000000000n)});
    console.log(f.blockNumber);
    console.log(l.blockNumber);

    const wwt = await WWT.create({
        strategy: Strategy.viem_cloudflare_eth_dev
    });


    let balance0x = 0

    //console.log({balance});
    //console.log(txs[0]);

    const methodIds__ = [
        '0x',
        '0x7ff36ab5', // swapExactETHForTokens(uint256,address[],address,uint256)
        '0x095ea7b3', // approve
        '0x18cbafe5', // swapExactTokensForETH(uint256,uint256,address[],address,uint256)
        '0x791ac947'  // swapExactTokensForETHSupportingFeeOnTransferTokens(uint256,uint256,address[],address,uint256)
    ]


    let balance: any = txs[0].value
    for await (const tx of txs) {
        if (+tx.txreceipt_status === 1) {
            if (['0x7ff36ab5'].includes(tx.methodId)) {
                balance -= +tx.value
            } else if (['0x18cbafe5', '0x791ac947'].includes(tx.methodId)) {
                balance += +tx.value
            }
        } else {
            // 0x1fc5d23275a5acbe1108e5e00a7b6e2487472b25b90fc2f2a5a2023d8ecd0265
            // 0x0897fdf30e0b737d3e8521128309f092f531c01ef67f32fe8538e5bd28a000f5
            // console.log('failed tx with hash: ' + tx.hash);
        }


    }
    console.log({balance: formatEther(balance)});


    //const bytecode = await wwt.getBytecode('0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2')
    const bytecode = await wwt.get_internal_txs('0x291997a769b5c342ab81c4445e7dfff843016169d16dcd4a104105a691828c6e')
    //await asyncWriteFile('./bytecode.evm', stringify(bytecode))
    //console.log({tx});
    //await delay(160000)
    // if (['0x18cbafe5', '0x7ff36ab5', '0x791ac947'].includes(tx.methodId)
    //     && +tx.txreceipt_status === 1
    // ) { // only swaps
    //     // if (tx.to === address) {
    //     //     balance += +tx.value
    //     // } else if (tx.from === address) {
    //     //     balance -= +tx.value
    //     // } else {
    //     //     throw Error(tx)
    //     // }
    // }


    //console.log({balance: fe(balance)});
}
//main()

const main09 = async () => {
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
    const address: `0x${string}` = '0x11fa5be01476295200cb162b952972d2c9c6c599'
    let txs: any[]
        = require(`./txs_etherscan_${address}.json`)

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
            coin: 111
        }
    ]

    console.table(arr);


    //const isERC20 = await wwt.isERC20('0x79c610b7ebddce5a87e777785600f7e6bd6f037e');
    // const typeERC
    //     = await wwt.getERCtype('0x79c610b7ebddce5a87e777785600f7e6bd6f037e');
    // console.log({typeERC});

    const fourByte = await FourByte.create({});
    const result = await fourByte.event_signatures_model.find({
        //"i": 7132
        "text_signature": {"$regex": "^balanceOf", "$options": "i"}
    });
    // // balanceOfaaasds() balanceOfToken(string,address) balanceOfPool(address,address)
    // // TODO:  signatures_model=1329
    // // TODO:  event_signatures_model=71
    // console.log({result});
    // console.log(result.length);

    const input
        = "0x7ff36ab50000000000000000000000000000000000000000000007f331ca1b535c81dadf000000000000000000000000000000000000000000000000000000000000008000000000000000000000000011fa5be01476295200cb162b952972d2c9c6c5990000000000000000000000000000000000000000000000000000000065e243b80000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000009506d37f70eb4c3d79c398d326c871abbf10521d";


    // const result2 = await fourByte.signatures_model.aggregate([
    //     {
    //         $group: {
    //             i: {$count: "total"}
    //         }
    //     }
    // ])
    // console.log({result2});

    //const result = await fourByte.signatures_model.findOne({}).sort('-i')
    // TODO: max = 1116789
    // const ids = arrayRange(1, 1116789, 1)
    //
    // const result = await fourByte.signatures_model.find({
    //     i: {
    //         $exists: true,
    //         $nin: ids
    //     }
    // });
    //
    // console.log(result.map(it => it.i));
    // console.log(result.map(it => it.i).length);

    // await fourByte.get_failed_signatures(
    //     Type4byte.signatures,
    //     [ // 1094318
    //         7127, 7128, 7129, 7130, 7131, 7132, 7133, 7134, 7135, 7136, 7137, 7138,
    //         7139, 7140, 7141, 7142, 7412, 8100, 8828, 9048, 9201, 9269, 9303, 9413,
    //         10159, 10439, 10460, 10599, 10651, 10663, 10733, 10749, 10794, 10840,
    //     ]
    // );


    // const res = await fourByte.signatures_model.entries.aggregate(
    //     [
    //         {$group: {_id: null, min: {$min: "$i"}, max: {$max: "$i"}}},
    //         {$addFields: {rangeIds: {$range: ["$min", "$max"]}}},
    //         {$lookup: {from: "signatures", localField: "rangeIds", foreignField: "i", as: "signatures"}},
    //         {$project: {_id: 0, missingIds: {$setDifference: ["$rangeIds", "$signatures.i"]}}}
    //     ]
    // )
    //console.log(res[0].missing);

    // const res = await fourByte.signatures_model.aggregate([
    //     {
    //         $group: {
    //             _id: null,
    //             nos: {$push: "$i"}
    //         }
    //     },
    //     {
    //         $addFields: {
    //             missing: {$setDifference: [{$range: [1, 1094318]}, "$nos"]}
    //         }
    //     }
    // ])
    //await fourByte.get_failed_signatures(Type4byte.signatures, res[0].missing);
    await fourByte.mongoDbClient.disconnect()
    // TODO: const erc1155InterfaceId = '0xd9b67a26';
    /*
    CREATE TABLE IF NOT EXISTS coll_test
(
    _id UUID,
    created_at DateTime64(6, 'UTC') CODEC(Delta, LZ4),
    text_signature String,
    hex_signature String,
    bytes_signature String,
    i Int32 CODEC(Delta, LZ4),
    __v UInt16 CODEC(Delta, LZ4)
) ENGINE = MongoDB('localhost:27017', 'wwt', 'signatures', '', '', 'connectTimeoutMS=10000&ssl=false');

     */
}
//parser();

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