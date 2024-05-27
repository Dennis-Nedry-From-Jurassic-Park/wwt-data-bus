const pairs = [
    'XRPUSDT',
    'ARBUSDT',
    'STRKUSDT',
    'OPUSDT',
    'ETHUSDT',
    'ICPUSDT',

    'APTUSDT',
    'SOLUSDT',
    // mem-coins
    'PEPEUSDT',

]

const klineTopics = pairs.map(it => `kline.1.${it}`)

export const wsTopics = [
    ...[],
    ...klineTopics
]