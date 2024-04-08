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

export const Type4byte = {
    signatures: "signatures",
    event_signatures: "event-signatures",
}
export type Type4byte = typeof Type4byte[keyof typeof Type4byte]
