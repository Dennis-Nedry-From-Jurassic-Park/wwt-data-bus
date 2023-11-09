import {BenchmarkJob, Column, Params} from 'benchmark-node';

const msg = {
    "token": {
        "name": "NITRO",
        "symbol": "NITRO",
        "decimals": 18,
        "address": "0x95B6cD4aCb05A4e3B682f009FD323BB1D822F5cF",
        "totalHolders": 9
    },
    "withToken": {
        "name": "Wrapped Ether",
        "symbol": "WETH",
        "decimals": 18,
        "address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        "totalHolders": 740364
    },
    "simulationSuccess": true,
    "honeypotResult": {
        "isHoneypot": true,
        "honeypotReason": "execution reverted: UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT"
    },
    "simulationResult": {"buyTax": 0, "sellTax": 100, "transferTax": 0, "buyGas": "0", "sellGas": "0"},
    "holderAnalysis": {
        "holders": "6",
        "successful": "6",
        "failed": "0",
        "siphoned": "0",
        "averageTax": 97.87166666666667,
        "averageGas": 275828,
        "highestTax": 97.97,
        "highTaxWallets": "6",
        "taxDistribution": [{"tax": 97, "count": 6}]
    },
    "flags": ["EXTREMELY_HIGH_TAXES", "high_tax"],
    "chain": {"id": "1", "name": "Ethereum", "shortName": "eth", "currency": "ETH"},
    "router": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    "pair": {
        "pair": {
            "name": "Uniswap V2: NITRO-WETH",
            "address": "0x3785FCDd03Ab373Bf75E787C12ABeC72Fb8e2741",
            "token0": "0x95B6cD4aCb05A4e3B682f009FD323BB1D822F5cF",
            "token1": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            "type": "UniswapV2"
        },
        "chainId": "1",
        "reserves0": "1298907",
        "reserves1": "1",
        "liquidity": 0,
        "router": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
        "createdAtTimestamp": "1698164795",
        "creationTxHash": "0xca0f690b9c014f12d3fd840ef6d68ff53ef743c4262364f025a8652b5e26f872"
    },
    "pairAddress": "0x3785FCDd03Ab373Bf75E787C12ABeC72Fb8e2741"
}
import sizeof from 'object-sizeof';
import {_flattenObject, flattenObj_, flattenObject, flattenObjectES2017} from "../src/flat";

import flatObj from 'flat-obj';

new BenchmarkJob({ columns: [Column.Median, Column.Min, Column.Max, Column.Ops] })
    .setSetup(
        (size: number) => {
            //buffer = crypto.randomBytes(size);
        },
        [new Params(100, 1000)], // , 1000, 10_000, 100_000, 1_000_000  10_000, 100_000, 1_000_000 , 100_000_000, 1_000_000_000
    )
    .add('flatObj', () => {
        const obj = flatObj(msg, '.')
        //console.log(obj);
        //sizeof(obj)
    })
    .add('flattenObjectES2017', () => {
        const obj = flattenObjectES2017(msg)
        //console.log(obj);
        //sizeof(obj)
    })
    .add('_flattenObject', () => {
        const obj = _flattenObject(msg)
        //console.log(obj);
        //sizeof(obj)
    })
    .add('flattenObj_', () => {
        const obj = flattenObj_(msg)
        //console.log(obj);
        //sizeof(obj)
    })
    .add('flattenObject', () => {
        const obj = flattenObject(msg)
        //console.log(obj);
        //sizeof(obj)
    })

    .run();
