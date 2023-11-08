console.log(111);

const obj = JSON.parse("{\"msg\": \"21111111000111111111111A111\"}".toString())
console.log(obj);
console.log(typeof obj);

console.log(new Date().toISOString());

const pairs = {
    "ChainID": 1,
    "Pair": {
        "Name": "Uniswap V2: NITRO-WETH",
        "Tokens": ["0x95b6cd4acb05a4e3b682f009fd323bb1d822f5cf", "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"],
        "Address": "0x3785fcdd03ab373bf75e787c12abec72fb8e2741"
    },
    "Reserves": [1298907, 1],
    "Liquidity": 0,
    "Router": "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
    "CreatedAtTimestamp": 1698164795,
    "CreationTxHash": "0xca0f690b9c014f12d3fd840ef6d68ff53ef743c4262364f025a8652b5e26f872"
}

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

let o = {}

const pairAddress = msg.pairAddress
console.log(pairAddress);

// o['pairAddress'] = pairs.Pair.Address
// o['ts'] = new Date(pairs.CreatedAtTimestamp * 1000)
// o['createdAtTimestamp'] = pairs.CreatedAtTimestamp
// o['router'] = pairs.Router
// o['liquidity'] = pairs.Liquidity
// console.log(o);

//import { flatten } from 'flat'
//import { flatten } from 'flat'

function flattenObject(obj, separator = '.') {
    let result = {};
    function recurse(cur, prop) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
            for (let i = 0, l = cur.length; i < l; i++) {
                recurse(cur[i], prop + separator + i);
                if (l == 0) result[prop] = [];
            }


        } else {
            let isEmpty = true;
            for (let p in cur) {
                isEmpty = false;
                recurse(cur[p], prop ? prop + separator + p : p);
            }
            if (isEmpty && prop) result[prop] = {};
        }
    }
    recurse(obj, '');
    return result;
}

const algo = async () => {
    const obj = {
        'token.name': 'NITRO',
        'token.symbol': 'NITRO',
        'token.decimals': 18,
        'token.address': '0x95B6cD4aCb05A4e3B682f009FD323BB1D822F5cF',
        'token.totalHolders': 9,
        'withToken.name': 'Wrapped Ether',
        'withToken.symbol': 'WETH',
        'withToken.decimals': 18,
        'withToken.address': '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        'withToken.totalHolders': 740364,
        'simulationSuccess': true,
        'honeypotResult.isHoneypot': true,
        'honeypotResult.honeypotReason': 'execution reverted: UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT',
        'simulationResult.buyTax': 0,
        'simulationResult.sellTax': 100,
        'simulationResult.transferTax': 0,
        'simulationResult.buyGas': '0',
        'simulationResult.sellGas': '0',
        'holderAnalysis.holders': '6',
        'holderAnalysis.successful': '6',
        'holderAnalysis.failed': '0',
        'holderAnalysis.siphoned': '0',
        'holderAnalysis.averageTax': 97.87166666666667,
        'holderAnalysis.averageGas': 275828,
        'holderAnalysis.highestTax': 97.97,
        'holderAnalysis.highTaxWallets': '6',
        'holderAnalysis.taxDistribution.0.tax': 97,
        'holderAnalysis.taxDistribution.0.count': 6,
        'flags.0': 'EXTREMELY_HIGH_TAXES',
        'flags.1': 'high_tax',
        'chain.id': '1',
        'chain.name': 'Ethereum',
        'chain.shortName': 'eth',
        'chain.currency': 'ETH',
        'router': '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
        'pair.pair.name': 'Uniswap V2: NITRO-WETH',
        'pair.pair.address': '0x3785FCDd03Ab373Bf75E787C12ABeC72Fb8e2741',
        'pair.pair.token0': '0x95B6cD4aCb05A4e3B682f009FD323BB1D822F5cF',
        'pair.pair.token1': '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        'pair.pair.type': 'UniswapV2',
        'pair.chainId': '1',
        'pair.reserves0': '1298907',
        'pair.reserves1': '1',
        'pair.liquidity': 0,
        'pair.router': '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
        'pair.createdAtTimestamp': '1698164795',
        'pair.creationTxHash': '0xca0f690b9c014f12d3fd840ef6d68ff53ef743c4262364f025a8652b5e26f872',
        'pairAddress': '0x3785FCDd03Ab373Bf75E787C12ABeC72Fb8e2741'
    }
    const obj_ = JSON.stringify(obj)
console.log(obj_);
}
const algo1 = async () => {
    console.log(flattenObject(msg));
}
const algo2 = async () => {
    if(msg.honeypotResult.isHoneypot) {
        console.log(msg.honeypotResult.isHoneypot);
    }

    if(pairs.Liquidity < 10000) {

    }
}
algo();