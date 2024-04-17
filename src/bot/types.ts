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


