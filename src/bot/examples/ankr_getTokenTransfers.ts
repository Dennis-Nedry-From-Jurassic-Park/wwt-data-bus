// @ts-nocheck

// TODO: ZYN/WETH - 0x68b44c26874998adbd41a964e92315809524c7cb
// https://platform.arkhamintelligence.com/explorer/address/0x68b44c26874998AdbD41a964e92315809524c7cB


import {Table} from "../types";

await wwt.savePaginatedPages("ankr_getTokenTransfers", {
    address: [address], // "0x79c610b7ebddce5a87e777785600f7e6bd6f037e"
    blockchain: 'eth',
    descOrder: false,
    syncCheck: false,
    pageSize: 1000,
    pageToken: ''
}, Table.wwt_ankr_getTokenTransfers)