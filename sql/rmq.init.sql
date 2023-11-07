CREATE DATABASE IF NOT EXISTS rmq ;

CREATE TABLE rmq.event (
    `timestamp` DateTime,
    `id` UInt32,
    `body` String
) Engine = Memory;


CREATE TABLE IF NOT EXISTS rmq._ (
        timestamp UInt64,
        id UInt32,
        body String
) ENGINE = RabbitMQ
SETTINGS
    //rabbitmq_address = 'amqp://zowie:2840@localhost:5672',
    rabbitmq_host_port = '172.17.0.2:5672',
    rabbitmq_exchange_name = 'exch',
    rabbitmq_exchange_type = 'direct',
    rabbitmq_format = 'JSONEachRow',
    rabbitmq_routing_key_list = '#1-a',
    rabbitmq_num_consumers = 1



CREATE MATERIALIZED VIEW IF NOT EXISTS rmq.event_view
TO rmq.event AS
SELECT
    toDateTime(toUInt64(divide(timestamp, 1000000000))) AS timestamp,
    id AS id,
    body AS body
FROM rmq._;

    ,



    date_time_input_format = 'best_effort';

SELECT name, last_error_time , last_error_message　FROM system.errors　order by last_error_time desc


DROP TABLE _;
DROP MATERIALIZED VIEW _;
DROP TABLE _t

CREATE TABLE IF NOT EXISTS _ (
        timestamp DateTime,
        id UInt32,
        msg String
) ENGINE = RabbitMQ
SETTINGS
    //rabbitmq_address = 'amqp://zowie:2840@localhost:5672',
    rabbitmq_host_port = '172.17.0.2:5672',
    rabbitmq_exchange_name = 'exch',
    rabbitmq_exchange_type = 'direct',
    rabbitmq_format = 'JSONEachRow',
    rabbitmq_routing_key_list = '#1-a',
    rabbitmq_num_consumers = 1,
    date_time_input_format = 'best_effort';

CREATE MATERIALIZED VIEW IF NOT EXISTS _ TO _t AS
SELECT timestamp, id, msg FROM _


CREATE MATERIALIZED VIEW IF NOT EXISTS event_view
TO _t AS
SELECT
    toDateTime(toUInt64(divide(timestamp, 1000000000))) AS timestamp,
    id AS id,
    msg AS msg
FROM _;


set stream_like_engine_allow_direct_select=1

SELECT *
FROM system.errors
WHERE value > 0
ORDER BY code ASC
LIMIT 1

CREATE TABLE IF NOT EXISTS _t (
        timestamp DateTime,
        id UInt32,
        msg String
) ENGINE MergeTree()
ORDER BY tuple()
SETTINGS index_granularity = 8192;




CREATE TABLE IF NOT EXISTS _t (
        date DateTime DEFAULT now(),
        key String,
        payload String
) ENGINE MergeTree()








SELECT (JSONExtract(payload, 'Tuple(UInt32, UInt32, UInt32, UInt32, String, UInt32, UInt32, Int64, Int64, String)') AS parsed_json),
generateUUIDv4() AS uuid,
parsed_json.1 AS user_id,
parsed_json.2 AS car_id,
parsed_json.3 AS auction_id,
parsed_json.4 AS branch_id,
parsed_json.5 AS name,
parsed_json.6 AS appointment_id,
parsed_json.7 AS appointment_status_id,
parsed_json.8 AS datetime,
parsed_json.9 AS duration,
JSONExtractKeysAndValuesRaw(parsed_json.10) AS labels

FROM _

CREATE TABLE IF NOT EXISTS _ (

uuid UUID,
datetime DateTime64(3),
name LowCardinality(String),
duration Int64,

appointment_id UInt32,
appointment_status_id UInt32,
user_id UInt32,
car_id UInt32,
auction_id UInt32,
branch_id UInt32,

labels Map(LowCardinality(String), String)

) ENGINE MergeTree()