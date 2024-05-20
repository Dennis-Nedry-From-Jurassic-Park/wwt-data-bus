-- TODO: -------------------------------  ankr  -------------------------------

set allow_experimental_object_type = 1;

CREATE TABLE wwt.ankr_getTransactionsByAddress
(
    timestamp DateTime64(3, 'UTC'),
    data JSON CODEC(ZSTD(3))
)
ENGINE = MergeTree
ORDER BY timestamp


--drop table wwt.ankr_getTransactionsByAddress
--truncate table wwt.ankr_getTransactionsByAddress


set allow_experimental_object_type = 1;

CREATE TABLE wwt.ankr_getTokenTransfers
(
    timestamp DateTime64(3, 'UTC'),
    data JSON CODEC(ZSTD(3)),
    address String CODEC(LZ4),
    nextPageToken String CODEC(LZ4)
)
ENGINE = MergeTree
ORDER BY timestamp


set allow_experimental_object_type = 1;

CREATE TABLE wwt.ankr_getTransactionsByAddress_Temp
(
    timestamp DateTime64(3, 'UTC'),
    data JSON CODEC(ZSTD(3)),
    address String CODEC(LZ4),
    nextPageToken String CODEC(LZ4)
)
ENGINE = MergeTree
ORDER BY timestamp

-- TODO: -------------------------------  4byte  -------------------------------
CREATE TABLE wwt.4byte_signatures
(
    `_id` UUID, -- bug with mongodb id
    `created_at` DateTime64(6,'UTC') CODEC(Delta(8),LZ4),
    `text_signature` String,
    `hex_signature` String,
    `bytes_signature` String,
    `i` Int32 CODEC(Delta(4),LZ4),
    `__v` UInt16 CODEC(Delta(2),LZ4)
)
ENGINE = MergeTree()
ORDER BY `created_at`


alter table wwt.`4byte_signatures` drop column _id
alter table wwt.`4byte_signatures` drop column __v


-- ddl from dbeaver
CREATE TABLE wwt.`4byte.eventsignatures`
(
    `_id` UUID,
    `created_at` DateTime64(6,'UTC') CODEC(Delta(8),LZ4),
    `text_signature` String,
    `hex_signature` String,
    `bytes_signature` String,
    `i` Int32 CODEC(Delta(4),LZ4),
    `__v` UInt16 CODEC(Delta(2),LZ4)
)
ENGINE = MongoDB(
    'localhost:27017',
     'wwt',
     '4byte.eventsignatures',
     '',
     '[HIDDEN]',
     'connectTimeoutMS=10000&ssl=false'
 );


CREATE TABLE wwt.4byte_eventsignatures
(
    `created_at` DateTime64(6,'UTC') CODEC(Delta(8),LZ4),
    `text_signature` String,
    `hex_signature` String,
    `bytes_signature` String,
    `i` Int32 CODEC(Delta(4),LZ4)
)
ENGINE = MergeTree()
ORDER BY `created_at`

 -- TODO: -------------------------------  ??  -------------------------------