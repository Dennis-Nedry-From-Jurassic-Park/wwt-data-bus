export interface BybitTemp {
    timestamp: number;
    router: string;
    data: any;
    version: number;
}
/*
set allow_experimental_object_type = 1;

CREATE TABLE wwt.bybit_temp
(
    timestamp DateTime64(3, 'UTC') CODEC(Delta, LZ4),
    router String CODEC(LZ4),
    data JSON CODEC(ZSTD(3)),
    version Int8 CODEC(Delta, ZSTD)
)
ENGINE = MergeTree
ORDER BY timestamp
 */