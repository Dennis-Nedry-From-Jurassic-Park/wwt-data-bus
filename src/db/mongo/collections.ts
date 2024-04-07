export const Collection = {
    data: 'data',
    logs: 'logs',
    eth_mainnet: 'eth.mainnet',
    // 4byte
    signatures: '4byte.signatures',
    eventsignatures: '4byte.eventsignatures',
}

export type Collection = typeof Collection[keyof typeof Collection]