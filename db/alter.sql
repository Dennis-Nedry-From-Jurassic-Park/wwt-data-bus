ALTER TABLE wwt.ankr_getTransactionsByAddress ADD COLUMN address String CODEC(LZ4);

ALTER TABLE wwt.ankr_getTransactionsByAddress
UPDATE address = '0x..599'
WHERE address = ''