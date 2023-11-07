CREATE DATABASE IF NOT EXISTS rmq ;

DROP TABLE rmq.event
DROP TABLE rmq._
DROP VIEW rmq.event_view

CREATE OR REPLACE TABLE rmq.event (
    timestamp DateTime64(3),
    id UInt32,
    routingKey String,
    body String,
    _exchange_name String,
    _channel_id String,
    _delivery_tag UInt64,
    _timestamp UInt64
) Engine = Memory;

CREATE OR REPLACE TABLE rmq._ (
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
    rabbitmq_host_port = '172.17.0.2:5672',
    rabbitmq_exchange_name = 'exch',
    rabbitmq_exchange_type = 'direct',
    rabbitmq_format = 'JSONEachRow',
    rabbitmq_routing_key_list = '#1-a,ms.scam-coin.getPairs,ms.scam-coin.IsHoneypotCoin',
    rabbitmq_num_consumers = 1,
    date_time_input_format = 'best_effort';
    //rabbitmq_address = 'amqp://zowie:2840@localhost:5672',

DROP VIEW rmq.event_view

CREATE MATERIALIZED VIEW rmq.event_view
TO rmq.event AS
SELECT
    now() as timestamp,
    id AS id,
    routingKey AS routingKey,
    body AS body,
    _exchange_name AS _exchange_name,
    _channel_id AS _channel_id,
    _delivery_tag AS _delivery_tag,
    _timestamp AS _timestamp
FROM rmq._;
