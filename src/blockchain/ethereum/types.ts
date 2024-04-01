export const BlockTag: any = {
    // Use 'latest' to get the most recent transaction count
    latest: "latest", // Optional, defaults to 'latest'
    earliest: "earliest",
    pending: "pending",
    safe: "safe",
    finalized: "finalized",
}
export type BlockTag = typeof BlockTag[keyof typeof BlockTag];