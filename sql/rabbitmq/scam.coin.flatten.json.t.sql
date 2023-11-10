CREATE DATABASE IF NOT EXISTS rmq;

CREATE OR REPLACE TABLE rmq.flatten_json (
    timestamp DateTime64(3) Codec(DoubleDelta, Default),
    id UInt32 Codec(Delta, Default),
    routingKey String Codec(Default),
    body String Codec(Default),
    pairAddress String DEFAULT JSONExtractString(body, 'pairAddress') Codec(Default),
    pair String DEFAULT JSONExtractString(body, 'token.symbol') || '/' || JSONExtractString(body, 'withToken.symbol') Codec(Default),
    tokenAddress String DEFAULT JSONExtractString(body, 'token.address') Codec(Default),
    totalHolders UInt32 DEFAULT JSONExtractInt(body, 'token.totalHolders') Codec(Delta, Default),
    holders UInt32 DEFAULT JSONExtractInt(body, 'holderAnalysis.holders') Codec(Delta, Default),
    router LowCardinality(String) DEFAULT JSONExtractString(body, 'router') Codec(Default),
    simulationSuccess Boolean DEFAULT JSONExtractBool(body, 'simulationSuccess') Codec(Delta, Default),
    isHoneypot Boolean DEFAULT JSONExtractBool(body, 'honeypotResult.isHoneypot') Codec(Delta, Default),
    chainId Int64 DEFAULT JSONExtractInt(body, 'pair.chainId') Codec(DoubleDelta, Default),
    chainName LowCardinality(String) DEFAULT JSONExtractString(body, 'chain.name') Codec(Default),
    reserves0 Float32 DEFAULT JSONExtractFloat(body, 'pair.reserves0') Codec(Gorilla, ZSTD),
    reserves1 Float32 DEFAULT JSONExtractFloat(body, 'pair.reserves1') Codec(Gorilla, ZSTD),
    liquidity Float32 DEFAULT JSONExtractFloat(body, 'pair.liquidity') Codec(Gorilla, ZSTD),
    decimals UInt8 DEFAULT JSONExtractUInt(body, 'token.decimals') Codec(Delta, Default),
    exchange LowCardinality(String) DEFAULT JSONExtractString(body, 'pair.pair.type'),
    _exchange_name String Codec(Default),
    _channel_id String Codec(Default),
    _delivery_tag UInt64 Codec(Delta, Default),
    _timestamp UInt64 Codec(Delta, Default)
) Engine = MergeTree()
PARTITION BY toYYYYMM(timestamp)
ORDER BY (pairAddress, timestamp DESC)
SETTINGS index_granularity = 8192


ORDER BY (timestamp, payment_method, status)
PARTITION BY (toStartOfDay(toDate(created_at)), status);

CREATE OR REPLACE TABLE rmq.flatten_json_memory (
    timestamp DateTime64(3),
    id UInt32,
    routingKey String,
    body String,
    pairAddress String DEFAULT JSONExtractString(body, 'pairAddress'),
    pair String DEFAULT JSONExtractString(body, 'token.symbol') || '/' || JSONExtractString(body, 'withToken.symbol'),
    tokenAddress String DEFAULT JSONExtractString(body, 'token.address'),
    totalHolders UInt32 DEFAULT JSONExtractInt(body, 'token.totalHolders'),
    holders UInt32 DEFAULT JSONExtractInt(body, 'holderAnalysis.holders'),
    router LowCardinality(String) DEFAULT JSONExtractString(body, 'router'),
    simulationSuccess Boolean DEFAULT JSONExtractBool(body, 'simulationSuccess'),
    isHoneypot Boolean DEFAULT JSONExtractBool(body, 'honeypotResult.isHoneypot'),
    chainId Int64 DEFAULT JSONExtractInt(body, 'pair.chainId'),
    chainName LowCardinality(String) DEFAULT JSONExtractString(body, 'chain.name'),
    reserves0 Float32 DEFAULT JSONExtractFloat(body, 'pair.reserves0'),
    reserves1 Float32 DEFAULT JSONExtractFloat(body, 'pair.reserves1'),
    liquidity Float32 DEFAULT JSONExtractFloat(body, 'pair.liquidity'),
    decimals UInt8 DEFAULT JSONExtractUInt(body, 'token.decimals'),
    exchange LowCardinality(String) DEFAULT JSONExtractString(body, 'pair.pair.type'),
    _exchange_name String,
    _channel_id String,
    _delivery_tag UInt64,
    _timestamp UInt64
) Engine = Memory;

CREATE OR REPLACE TABLE rmq.flatten_json_rabbitmq (
        timestamp DateTime64(3),
        id UInt32,
        routingKey String,
        body String,
        _exchange_name String,
        _channel_id String,
        _delivery_tag UInt64,
        _timestamp UInt64
) ENGINE = RabbitMQ
SETTINGS
    rabbitmq_host_port = '172.17.0.3:5672',
    rabbitmq_exchange_name = 'exch',
    rabbitmq_exchange_type = 'direct',
    rabbitmq_format = 'JSONEachRow',
    rabbitmq_routing_key_list = 'ms.scam-coin.IsHoneypotCoin.Flatten',
    rabbitmq_num_consumers = 1,
    date_time_input_format = 'best_effort';
    //rabbitmq_address = 'amqp://zowie:2840@localhost:5672',

DROP VIEW rmq.event_view

CREATE MATERIALIZED VIEW rmq.flatten_json_view
TO rmq.flatten_json AS
SELECT
    now() as timestamp,
    id AS id,
    routingKey AS routingKey,
    body AS body,
    _exchange_name AS _exchange_name,
    _channel_id AS _channel_id,
    _delivery_tag AS _delivery_tag,
    _timestamp AS _timestamp
FROM rmq.flatten_json_rabbitmq;

multiple! -> table size
INSERT INTO rmq.flatten_json (rawJSON) VALUES (
'{"token.name":"NITRO","token.symbol":"NITRO","token.decimals":18,"token.address":"0x95B6cD4aCb05A4e3B682f009FD323BB1D822F5cF","token.totalHolders":9,"withToken.name":"Wrapped Ether","withToken.symbol":"WETH","withToken.decimals":18,"withToken.address":"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2","withToken.totalHolders":740364,"simulationSuccess":true,"honeypotResult.isHoneypot":true,"honeypotResult.honeypotReason":"execution reverted: UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT","simulationResult.buyTax":0,"simulationResult.sellTax":100,"simulationResult.transferTax":0,"simulationResult.buyGas":"0","simulationResult.sellGas":"0","holderAnalysis.holders":"6","holderAnalysis.successful":"6","holderAnalysis.failed":"0","holderAnalysis.siphoned":"0","holderAnalysis.averageTax":97.87166666666667,"holderAnalysis.averageGas":275828,"holderAnalysis.highestTax":97.97,"holderAnalysis.highTaxWallets":"6","holderAnalysis.taxDistribution.0.tax":97,"holderAnalysis.taxDistribution.0.count":6,"flags.0":"EXTREMELY_HIGH_TAXES","flags.1":"high_tax","chain.id":"1","chain.name":"Ethereum","chain.shortName":"eth","chain.currency":"ETH","router":"0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D","pair.pair.name":"Uniswap V2: NITRO-WETH","pair.pair.address":"0x3785FCDd03Ab373Bf75E787C12ABeC72Fb8e2741","pair.pair.token0":"0x95B6cD4aCb05A4e3B682f009FD323BB1D822F5cF","pair.pair.token1":"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2","pair.pair.type":"UniswapV2","pair.chainId":"1","pair.reserves0":"1298907","pair.reserves1":"1","pair.liquidity":0,"pair.router":"0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D","pair.createdAtTimestamp":"1698164795","pair.creationTxHash":"0xca0f690b9c014f12d3fd840ef6d68ff53ef743c4262364f025a8652b5e26f872","pairAddress":"0x3785FCDd03Ab373Bf75E787C12ABeC72Fb8e2741"}'
);







