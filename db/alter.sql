ALTER TABLE wwt.ankr_getTransactionsByAddress ADD COLUMN address String CODEC(LZ4);

ALTER TABLE wwt.ankr_getTransactionsByAddress
UPDATE address = '0x..599'
WHERE address = ''

ALTER TABLE wwt.ankr_getTransactionsByAddress ADD COLUMN nextPageToken String CODEC(LZ4);

UPDATE wwt.ankr_getTransactionsByAddress
SET nextPageToken = JSONExtractString(toJSONString(data), 'nextPageToken')
WHERE 1=1

select
timestamp,
address,
nextPageToken, -- attention
JSONExtractString(toJSONString(data), 'nextPageToken') as nextPageToken2
from  wwt.ankr_getTransactionsByAddress


SELECT toJSONString(data) FROM wwt.ankr_getTransactionsByAddress

SELECT
    reinterpretAsUUID(timestamp),
    JSONExtractString(toJSONString(data), 'nextPageToken')
FROM wwt.ankr_getTransactionsByAddress
