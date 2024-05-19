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