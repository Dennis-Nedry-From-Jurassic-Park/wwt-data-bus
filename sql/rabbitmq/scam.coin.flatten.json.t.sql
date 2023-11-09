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









