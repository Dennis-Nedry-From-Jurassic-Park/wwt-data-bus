// @ts-nocheck

const wwt = await WWT.create({
    strategy: Strategy.viem_cloudflare_eth_dev
})

// await wwt.savePaginatedPages("ankr_getAccountBalanceHistorical",{
//     walletAddress: address,
//     blockchain: 'eth',
//     nativeFirst: false,
//     onlyWhitelisted: false,
//     syncCheck: false,
//     pageSize: 10000,
//     pageToken: ''
// }, Table.wwt_ankr_getAccountBalanceHistorical) // TODO Error: {"code":0,"message":"we can't execute this request"}


const data = await wwt.providerAnkr.getAccountBalanceHistorical({
    walletAddress: address,
    blockchain: 'eth',
    nativeFirst: false,
    onlyWhitelisted: false,
    syncCheck: false,
    pageSize: 10000,
    pageToken: ''
})

console.log({data});

await wwt.clickhouse_beta.insert({
    table: Table.wwt_ankr_getAccountBalanceHistorical,
    values: [
        { timestamp: new Date(), data: data, address: address, nextPageToken: '' },
    ],
    clickhouse_settings: { // Allows to insert serialized JS Dates (such as '2023-12-06T10:54:48.000Z')
        date_time_input_format: 'best_effort',
    },
    format: 'JSONEachRow',
})