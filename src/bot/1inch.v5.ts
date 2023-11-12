import {FusionSDK, NetworkEnum, PrivateKeyProviderConnector} from "@1inch/fusion-sdk";
import Web3 from "web3";

import {
    seriesNonceManagerContractAddresses,
    ChainId,
    Erc20Facade,
    LimitOrderBuilder,
    LimitOrderProtocolFacade,
    LimitOrderPredicateBuilder,
    NonceSeriesV2,
    SeriesNonceManagerFacade,
    SeriesNonceManagerPredicateBuilder,
    Web3ProviderConnector
} from '@1inch/limit-order-protocol-utils';
import {ActiveOrdersResponse} from "@1inch/fusion-sdk/api/orders";
import {PresetEnum} from "@1inch/fusion-sdk/api";

export class OneInchBot {
    private readonly _provider: any
    private readonly _sdk: any
    // our wallet address from metamask as example
    private readonly _makerAddress = '0x5AeC6f5979fc093e014185f17fCD9cf81ff9942C'
    private readonly _WETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'

    private makerPrivateKey = process.env.WWT_MM_WALLET_FF9942C_PKEY
    //private makerAddress = process.env.INFRA_1INCH_MAKER_ADDRESS
    //private nodeUrl: any = 'HTTP://127.0.0.1:7545'

    constructor() {
        this._provider = new Web3(
            new Web3.providers.HttpProvider(
                process.env.WWT_CHAINNODES_WEB3_HTTPS
            )
        );

        const blockchainProvider = new PrivateKeyProviderConnector(this.makerPrivateKey, this.provider)

        this._sdk = new FusionSDK({
            url: 'https://api.1inch.dev/fusion',
            network: NetworkEnum.ETHEREUM,
            blockchainProvider,
            authKey: process.env.INFRA_1INCH_API_KEY
        })

    }

    get provider() {
        return this._provider
    }
    get sdk() {
        return this._sdk
    }
    get WETH() {
        return this._WETH
    }
    get makerAddress() {
        return this._makerAddress
    }

    cancel_order = async () => {
        //await sdk.buildCancelOrderCallData('0x005e51b961cca9a1704a84252da30148fb8e2b3fe048665726df82786b9600b1')
        try {
            const activeOrders: ActiveOrdersResponse = await this.sdk.getActiveOrders({ page: 1, limit: 1 })
            console.log(activeOrders);
        } catch(error: any) {
            console.log(error);
            JSON.stringify(error,null,'\t')
        }
    }

    cancel_all_orders = async () => {
        const activeOrders: ActiveOrdersResponse = await this.sdk.getActiveOrders({ page: 1, limit: 1 })

        const limit = activeOrders.meta.totalItems

        const orders = await this.sdk.getActiveOrders({ page: 1, limit: limit })
        //console.log(JSON.stringify(orders,null,'\t'));

        // отмена битых ордеров
        // for (const order of orders.items) {
        //     await sdk.buildCancelOrderCallData(order.orderHash)
        //     await delay(500)
        // }

        const orders_ = await this.sdk.getActiveOrders({ page: 1, limit: limit })
        console.log(this.pretty(orders_));

    }

    make_sha3 = (
        event: string,
    ) => {
        const uint256_hash = Web3.utils.sha3('OwnershipTransferred(address,address)')!
        console.log('hash=' + uint256_hash);
        return uint256_hash
    }

    arb = (
        event: string,
    ) => {
        const chainId = +ChainId.arbitrumMainnet; // Fee ~ 6-7$

    }

    pretty = (msg:any) => { console.log(JSON.stringify(msg,null,'\t')); }

    delay = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));

}

const main = async () => {
    const bot = new OneInchBot()
    //const activeOrders: ActiveOrdersResponse = await bot.sdk.getActiveOrders({ page: 1, limit: 1 })


    // const orders = await bot.sdk.getOrdersByMaker({
    //     page: 1,
    //     limit: 25,
    //     address: bot.makerAddress
    // })
    //
    // bot.pretty(orders)

    const params = {
        fromTokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
        toTokenAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amount: '1000000000000000000000'
    }

    const quote = await bot.sdk.getQuote(params)
    bot.pretty(quote)

    /*
    {
        "meta": {
                "totalItems": 0,
                "currentPage": 1,
                "itemsPerPage": 25,
                "totalPages": 0
        },
        "items": []
    }
     */


    // get signal ...
    // TODO: https://docs.1inch.io/docs/fusion-swap/fusion-sdk/for-integrators/sdk-overview/
    bot.sdk.placeOrder({
        fromTokenAddress: bot.WETH,
        toTokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC or other toke
        amount: '10000000000000000', // 0.01 ETH in wei https://converter.murkin.me/
        walletAddress: bot.makerAddress, // our wallet
        preset: PresetEnum.medium,
        fee: {
            takingFeeBps: 100, // 1% as we use bps format, 1% is equal to 100bps
            takingFeeReceiver: bot.makerAddress // fee receiver address
        }
    }).then(console.log)
}
main();










/*

const exec = async () => {
    const walletAddress = '0x1111111111111111111111111111111111111111';

    const ERC20ABI = [
        {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_spender",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_from",
                    "type": "address"
                },
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "name": "balance",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "name": "_spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "payable": true,
            "stateMutability": "payable",
            "type": "fallback"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        }
    ]
// TODO: https://www.npmjs.com/package/@1inch/multicall

    const tokens = [
        '0x6b175474e89094c44da98b954eedeac495271d0f',
        '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        '0xdac17f958d2ee523a2206206994597c13d831ec7'
    ];

    const contractCalls = tokens.map((tokenAddress) => {
        const callData = provider.contractEncodeABI(
            ERC20ABI,
            tokenAddress,
            'balanceOf',
            [walletAddress]
        );

        return provider.ethCall(
            tokenAddress,
            callData
        );
    });

    const balances = await Promise.all(contractCalls);
    console.log(balances);
}

*/
//exec()