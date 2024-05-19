// @ts-nocheck

import {Strategy, Table} from "../types";
import {WWT} from "../wwt";

const wwt = await WWT.create({
    strategy: Strategy.viem_cloudflare_eth_dev
})

await wwt.savePaginatedPages("ankr_getTransactionsByAddress", {
    address: ["0x79c610b7ebddce5a87e777785600f7e6bd6f037e"], // "0x79c610b7ebddce5a87e777785600f7e6bd6f037e"
    blockchain: 'eth',
    includeLogs: true,
    descOrder: false,
    syncCheck: false,
    pageSize: 1000,
    pageToken: ''
}, Table.wwt_ankr_getTransactionsByAddress)