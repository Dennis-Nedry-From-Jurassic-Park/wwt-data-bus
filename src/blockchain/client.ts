import {createPublicClient, http} from "viem";
import {mainnet} from "viem/chains";

export const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(),
    // transport: http('http://localhost:8545'), // TODO: Erigon Arch Node
});