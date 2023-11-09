CREATE OR REPLACE TABLE rmq.json
(
    rawJSON String,
    pairAddress String DEFAULT JSONExtractString(rawJSON, 'pairAddress'),
    pair String DEFAULT JSONExtractString(rawJSON, 'token.symbol') || '/' || JSONExtractString(rawJSON, 'withToken.symbol'),
    tokenAddress String DEFAULT JSONExtractString(rawJSON, 'token.address'),
    totalHolders UInt32 DEFAULT JSONExtractInt(rawJSON, 'token.totalHolders'),
    holders UInt32 DEFAULT JSONExtractInt(rawJSON, 'holderAnalysis.holders'),
    router LowCardinality(String) DEFAULT JSONExtractString(rawJSON, 'router'),
    simulationSuccess Boolean DEFAULT JSONExtractBool(rawJSON, 'simulationSuccess'),
    isHoneypot Boolean DEFAULT JSONExtractBool(rawJSON, 'honeypotResult.isHoneypot'),
    chainId Int64 DEFAULT JSONExtractInt(rawJSON, 'pair.chainId'),
    chainName LowCardinality(String) DEFAULT JSONExtractString(rawJSON, 'chain.name'),
    reserves0 Float32 DEFAULT JSONExtractFloat(rawJSON, 'pair.reserves0'),
    reserves1 Float32 DEFAULT JSONExtractFloat(rawJSON, 'pair.reserves1'),
    liquidity Float32 DEFAULT JSONExtractFloat(rawJSON, 'pair.liquidity'),
    decimals UInt8 DEFAULT JSONExtractUInt(rawJSON, 'token.decimals'),
    exchange LowCardinality(String) DEFAULT JSONExtractString(rawJSON, 'pair.pair.type'),

)
ENGINE = Memory

INSERT INTO rmq.json (rawJSON) VALUES (
'{"token.name":"NITRO","token.symbol":"NITRO","token.decimals":18,"token.address":"0x95B6cD4aCb05A4e3B682f009FD323BB1D822F5cF","token.totalHolders":9,"withToken.name":"Wrapped Ether","withToken.symbol":"WETH","withToken.decimals":18,"withToken.address":"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2","withToken.totalHolders":740364,"simulationSuccess":true,"honeypotResult.isHoneypot":true,"honeypotResult.honeypotReason":"execution reverted: UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT","simulationResult.buyTax":0,"simulationResult.sellTax":100,"simulationResult.transferTax":0,"simulationResult.buyGas":"0","simulationResult.sellGas":"0","holderAnalysis.holders":"6","holderAnalysis.successful":"6","holderAnalysis.failed":"0","holderAnalysis.siphoned":"0","holderAnalysis.averageTax":97.87166666666667,"holderAnalysis.averageGas":275828,"holderAnalysis.highestTax":97.97,"holderAnalysis.highTaxWallets":"6","holderAnalysis.taxDistribution.0.tax":97,"holderAnalysis.taxDistribution.0.count":6,"flags.0":"EXTREMELY_HIGH_TAXES","flags.1":"high_tax","chain.id":"1","chain.name":"Ethereum","chain.shortName":"eth","chain.currency":"ETH","router":"0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D","pair.pair.name":"Uniswap V2: NITRO-WETH","pair.pair.address":"0x3785FCDd03Ab373Bf75E787C12ABeC72Fb8e2741","pair.pair.token0":"0x95B6cD4aCb05A4e3B682f009FD323BB1D822F5cF","pair.pair.token1":"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2","pair.pair.type":"UniswapV2","pair.chainId":"1","pair.reserves0":"1298907","pair.reserves1":"1","pair.liquidity":0,"pair.router":"0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D","pair.createdAtTimestamp":"1698164795","pair.creationTxHash":"0xca0f690b9c014f12d3fd840ef6d68ff53ef743c4262364f025a8652b5e26f872","pairAddress":"0x3785FCDd03Ab373Bf75E787C12ABeC72Fb8e2741"}'
);

select * from rmq.json








CREATE OR REPLACE TABLE rmq.json
(
    `rawJSON` String EPHEMERAL,
    `pairAddress` String DEFAULT JSONExtractString(rawJSON, 'pairAddress'),
    `simulationSuccess` Boolean DEFAULT JSONExtractBool(rawJSON, 'simulationSuccess'),
    `isHoneypot` Nested(isHoneypot Boolean, honeypotReason String) DEFAULT JSONExtractKeysAndValues(rawJSON, 'honeypotResult')
)
ENGINE = Memory;


INSERT INTO rmq.json (rawJSON) VALUES (
'{"token":{"name":"NITRO","symbol":"NITRO","decimals":18,"address":"0x95B6cD4aCb05A4e3B682f009FD323BB1D822F5cF","totalHolders":9},"withToken":{"name":"Wrapped Ether","symbol":"WETH","decimals":18,"address":"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2","totalHolders":740364},"simulationSuccess":true,"honeypotResult":{"isHoneypot":true,"honeypotReason":"execution reverted: UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT"},"simulationResult":{"buyTax":0,"sellTax":100,"transferTax":0,"buyGas":"0","sellGas":"0"},"holderAnalysis":{"holders":"6","successful":"6","failed":"0","siphoned":"0","averageTax":97.87166666666667,"averageGas":275828,"highestTax":97.97,"highTaxWallets":"6","taxDistribution":[{"tax":97,"count":6}]},"flags":["EXTREMELY_HIGH_TAXES","high_tax"],"chain":{"id":"1","name":"Ethereum","shortName":"eth","currency":"ETH"},"router":"0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D","pair":{"pair":{"name":"Uniswap V2: NITRO-WETH","address":"0x3785FCDd03Ab373Bf75E787C12ABeC72Fb8e2741","token0":"0x95B6cD4aCb05A4e3B682f009FD323BB1D822F5cF","token1":"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2","type":"UniswapV2"},"chainId":"1","reserves0":"1298907","reserves1":"1","liquidity":0,"router":"0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D","createdAtTimestamp":"1698164795","creationTxHash":"0xca0f690b9c014f12d3fd840ef6d68ff53ef743c4262364f025a8652b5e26f872"},"pairAddress":"0x3785FCDd03Ab373Bf75E787C12ABeC72Fb8e2741"}'
);


CREATE OR REPLACE TABLE rmq.json



CREATE OR REPLACE TABLE rmq.json
(
    `rawJSON` String EPHEMERAL,
    `pairAddress` String DEFAULT JSONExtractString(rawJSON, 'pairAddress'),
    `simulationSuccess` Boolean DEFAULT JSONExtractBool(rawJSON, 'simulationSuccess'),
    `honeypotResult_` Nested(isHoneypot Nullable(String), honeypotReason String) DEFAULT JSONExtract(rawJSON, 'honeypotResult')
)
ENGINE = Memory;

SELECT JSONExtractKeysAndValues('{"token":{"name":"NITRO","symbol":"NITRO","decimals":18,"address":"0x95B6cD4aCb05A4e3B682f009FD323BB1D822F5cF","totalHolders":9},"withToken":{"name":"Wrapped Ether","symbol":"WETH","decimals":18,"address":"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2","totalHolders":740364},"simulationSuccess":true,"honeypotResult":{"isHoneypot":true,"honeypotReason":"execution reverted: UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT"},"simulationResult":{"buyTax":0,"sellTax":100,"transferTax":0,"buyGas":"0","sellGas":"0"},"holderAnalysis":{"holders":"6","successful":"6","failed":"0","siphoned":"0","averageTax":97.87166666666667,"averageGas":275828,"highestTax":97.97,"highTaxWallets":"6","taxDistribution":[{"tax":97,"count":6}]},"flags":["EXTREMELY_HIGH_TAXES","high_tax"],"chain":{"id":"1","name":"Ethereum","shortName":"eth","currency":"ETH"},"router":"0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D","pair":{"pair":{"name":"Uniswap V2: NITRO-WETH","address":"0x3785FCDd03Ab373Bf75E787C12ABeC72Fb8e2741","token0":"0x95B6cD4aCb05A4e3B682f009FD323BB1D822F5cF","token1":"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2","type":"UniswapV2"},"chainId":"1","reserves0":"1298907","reserves1":"1","liquidity":0,"router":"0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D","createdAtTimestamp":"1698164795","creationTxHash":"0xca0f690b9c014f12d3fd840ef6d68ff53ef743c4262364f025a8652b5e26f872"},"pairAddress":"0x3785FCDd03Ab373Bf75E787C12ABeC72Fb8e2741"}'
, 'honeypotResult', 'Nested(isHoneypot Boolean, honeypotReason String)')