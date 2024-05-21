import {ethers, EtherscanProvider} from "ethers/lib.esm";
import {BlockTag} from "../blockchain/ethereum/types";
import {AnkrProvider} from "@ankr.com/ankr.js";
import {RPC} from "./rpc";
import {JsonRpcProvider} from "ethers";
import {erc20Abi} from "abitype/abis";

export class Provider {
    private readonly etherscan_: EtherscanProvider
    private readonly ankr_: AnkrProvider
    private readonly getblock_: JsonRpcProvider
    private provider_: any

    constructor() {
        const etherscanProviderApiKey = process.env.WWT_ETHERSCAN

        if (!etherscanProviderApiKey) {
            throw Error("etherscanProviderApiKey is " + etherscanProviderApiKey)
        }

        // TODO: https://docs.etherscan.io/api-endpoints/accounts#get-a-list-of-normal-transactions-by-address
        this.etherscan_
            = new EtherscanProvider("homestead", etherscanProviderApiKey);
        this.ankr_ = new AnkrProvider(RPC.ankr_multichain);
        this.getblock_ = new ethers.JsonRpcProvider(RPC.getblock);
        this.provider_ = new ethers.JsonRpcProvider(RPC.default);

    }

    get ankr() {
        return this.ankr_;
    }

    get etherscan() {
        return this.etherscan_;
    }

    get getblock() {
        return this.getblock_;
    }

    get provider() {
        return this.provider_;
    }

    getHistory = async (address: string, startBlock?: BlockTag, endBlock?: BlockTag): Promise<Array<any>> => {
        const params = {
            action: "txlist",
            address,
            startblock: ((startBlock == null) ? 0 : startBlock),
            endblock: ((endBlock == null) ? 99999999 : endBlock),
            sort: "asc"
        };

        return this.etherscan.fetch("account", params);
    }

    get_internal_txs = async (transactionHash: string) => {

        // The transaction hash you want to trace

        // Use the debug_traceTransaction method
        // Error: could not coalesce error (error={ "code": -32601, "message": "Method not found" }

        // error: {
        //     code: -32000,
        //         message: 'required historical state unavailable (reexec=128)'
        // },

        this.getblock.send("debug_traceTransaction", [transactionHash, {}])
            .then(result => {
                console.log(result);
                return result
            })
            .catch(error => {
                console.error(error);
            });

    }

    checkERC20 = async (address: string) => {
        try {
            // TODO: @ethersproject/abiиз ethersпакета , abi-decoderили ethereum-input-data-decoder.
            const contract: any = new ethers.Contract(address, erc20Abi, this.provider);

            // Check if the contract implements the ERC-20 standard
            // TODO: Error: could not decode result data (value="0x", info={ "method": "decimals", "signature": "decimals()" }, code=BAD_DATA, ve

            const decimals = await contract.decimals();
            const name = await contract.name();
            const symbol = await contract.symbol();

            console.log(`Decimals: ${decimals}`);
            console.log(`Name: ${name}`);
            console.log(`Symbol: ${symbol}`);

            console.log("This address is likely an ERC-20 token.");
        } catch (error) {
            console.error(error);
            console.error("This address is not an ERC-20 token or the contract does not implement the required functions.");
        }
    }

    checkERC20_0 = async (address: string) => {
        const tokenContract: any = new ethers.Contract(address, erc20Abi, this.provider);

        tokenContract.balanceOf(address).then(balance => {
            console.log(`Balance: ${ethers.formatUnits(balance, 18)}`);
            console.log("This address is likely an ERC-20 token.");
        }).catch(error => {
            console.error(error);
            console.error("Error fetching balance:", error);
        });

        /* TODO:
        code: 'BAD_DATA',
  value: '0x',
  info: { method: 'balanceOf', signature: 'balanceOf(address)' },
  shortMessage: 'could not decode result data'
         */
    }
}