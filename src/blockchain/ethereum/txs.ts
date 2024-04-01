import {client} from "wwt";
import {BlockTag} from "./types";

export const get_txs = async (
    address: string = '0x11fa5be01476295200cb162b952972d2c9c6c599',
    blockTag: BlockTag,
) => {
    const transactionCount = await client.getTransactionCount({
        address: address,
        blockTag: blockTag

    });
    // { transactionCount: 695 }
    console.log({transactionCount});

    const transactions = [];
    for (let i = 0; i < transactionCount; i++) {
        const transaction = await client.getTransaction({
            blockTag: blockTag,
            index: i
        });
        transactions.push(transaction);
    }
    return transactions
}