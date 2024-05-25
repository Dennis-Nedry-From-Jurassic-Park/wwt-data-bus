const pairs = [
    'XRPUSDT',
    'ARBUSDT',
    'ETHUSDT'
]

const klineTopics = pairs.map(it => `kline.5.${it}`)

export const wsTopics = [
    ...[],
    ...klineTopics
]