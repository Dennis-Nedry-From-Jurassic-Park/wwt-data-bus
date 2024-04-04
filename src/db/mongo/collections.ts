export const Collection = {
    data: 'data',
    logs: 'logs',
    eth_mainnet: 'eth.mainnet'
}

export type Collection = typeof Collection[keyof typeof Collection]