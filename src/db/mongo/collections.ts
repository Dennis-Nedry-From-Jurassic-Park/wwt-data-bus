export const Collection = {
    data: 'data',
    logs: 'logs',
    eth_mainnet: 'eth.mainnet',
    // 4byte
    fourbyte_signatures: '4byte.signatures',
    fourbyte_eventsignatures: '4byte.eventsignatures',
    // etherface
    etherface_signatures: 'etherface.signatures',
}

export type Collection = typeof Collection[keyof typeof Collection]