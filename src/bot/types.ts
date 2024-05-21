export const OpsType = {
    log: "log",
    err: "err",
    data: "data",
}
export type OpsType = typeof OpsType[keyof typeof OpsType]

export const Strategy = {
    viem_cloudflare_eth_dev: "https://cloudflare-eth.com",
}

export type Strategy = typeof Strategy[keyof typeof Strategy]

// db: clickhouse
export const Table = {
    wwt_ankr_getTransactionsByAddress_Temp: "wwt.ankr_getTransactionsByAddress_Temp",
    wwt_ankr_getTransactionsByAddress: "wwt.ankr_getTransactionsByAddress",
    wwt_ankr_getTokenTransfers: "wwt.ankr_getTokenTransfers",
    wwt_ankr_getAccountBalance: "wwt.ankr_getAccountBalance",
    wwt_ankr_getAccountBalanceHistorical: "wwt.ankr_getAccountBalanceHistorical",
    wwt_ankr_temp: "wwt.ankr_temp",
}
export type Table = typeof Table[keyof typeof Table]

