import {parseAbiItem} from 'viem';

import {publicClient} from "./blockchain/client";


const event = parseAbiItem(
    'event PairCreated(address indexed token0, address indexed token1, address pair, uint)',
)

const exec = async () => {
    const blockNumber = await publicClient.getBlockNumber();
    console.log(blockNumber);

    // Get initial event logs (last 20 blocks)
    const logs = await publicClient.getLogs({
        event,
        fromBlock: blockNumber - 20n,
        toBlock: blockNumber,
    })
    console.log(logs);

    // Block number: 19156366
    // Block number: 19156367
    publicClient.watchBlockNumber({
        onBlockNumber: (blockNumber) => {
            console.log(`Block number: ${blockNumber}`);
        },
    })

    publicClient.watchBlocks({
        onBlock: (block) => {
            console.log({block});
        },
    })

    // Watch for new event logs
    publicClient.watchEvent({
        event,
        onLogs: (logs) => {
            console.log(JSON.stringify(logs, null, 2));
        },
    })
    // TODO: https://github.com/wevm/viem/issues/1540
    publicClient.watchPendingTransactions({
        pollingInterval: 5000,
        onTransactions: async (hashes) => {
            await Promise.all(
                hashes.map(async (hash) => {
                    try {
                        const tx = await publicClient.getTransaction({hash});
                        console.log(tx.hash);
                    } catch (e) {
                        if (
                            e instanceof Error &&
                            /Transaction with hash "0x[0-9a-fA-F]{64}" could not be found./.test(
                                e.message
                            )
                        ) {
                            console.log("Transaction not found:", hash);
                            return;
                        }
                        console.log(e);
                    }
                })
            );
        },
    });
}
//exec();