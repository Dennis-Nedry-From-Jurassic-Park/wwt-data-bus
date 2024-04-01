import {client} from "./wwt";
//exec();

const block = {
    baseFeePerGas: 15724698394n,
    blobGasUsed: 0n,
    difficulty: 0n,
    excessBlobGas: 0n,
    extraData: '0x6265617665726275696c642e6f7267',
    gasLimit: 30000000n,
    gasUsed: 16679907n,
    hash: '0x46387e47e0010ea53e98dc2e37bec111bd8b4605bd3d01cd03d4b40adea28c3a',
    logsBloom: '0x566b550375e8d941f328f1e2ffe39b8117cbec961cf6244262193c3877efdb9138b5518981886f707a735b3c8fc28b8d3fa13613db6af817a45a05123cba8f184c0a99ffe0d2def98842417bedf005f2858fa55f14d84c7fede60e43e9f8cab1404d6e400fe205e133c29ea0fd326cdb463020f993300509b34c76161a1e82aa0d2abef0376e0d6951dccbca23647e07545f4f49c5ff96ef62b859fd22f0a0b976e327e271942c7b1f4cc1c2a2d2364e6768c7ac52f911253fdd134a382022520bfb94122c5f4af159c4cab3c12df8e1a7aa6cfe57c9c1f0e1ff7d2f3dbca84610be26ce5e1ba038e24e86e7beb199c1ddc5f8964ba2e040bcbb601510cdd6b9',
    miner: '0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5',
    mixHash: '0x237c8689b340dba0ff9876b74e32aca77999044668ebfc438ca9d7f6e6c95999',
    nonce: '0x0000000000000000',
    number: 19496947n,
    parentBeaconBlockRoot: '0x150fbe21bde6c9436bd62a02327ecab9d51308ff54699f4136d9cc3f2857589e',
    parentHash: '0xebbab4dcbfba1f486057466e621728d0b8f4018373d7db6493fa000f5ef30fd4',
    receiptsRoot: '0x5b82f368e7760b54bdf991ebba83391bb24e722a705f306235c03ee793c592ce',
    sha3Uncles: '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
    size: 72324n,
    stateRoot: '0x71fefd0e8f529d8e5a8620ef20e4db368f14a5f1c753f3340463f74843f2a129',
    timestamp: 1711192655n,
    totalDifficulty: 58750003716598352816469n,
    transactions: [
        '0x657b541d005fa7d8b097346e2c7575df4832083413af482ed179754fb08c5c38',
        '0x55fafd30f9a817e307ad65045413f3cae917c1f51372a78eeab8d6d5471a2e11',
        '0x7d6b5ae711727ea0c434ef41f888b256a02844797f433c2c2ef8e3ae966670b1',
        '0x5f932c6a843e8d6d625baee11ef637c769058820e87e0b7561644112ba72c719',
        '0x74315681e5a07b9873a0cb56774a4ae3f759efad8ac0a1516e7de6df09e2335b',
        '0x686838d00207efea60816d6298a5bd8d21010ffb14915440be25776c9cf139f7',
        '0x72cfce7d1df03f51c51d4ea7950c08bec0151240c941243011c3cde664e8f49a',
        '0x8fe5b5371c07cd06b3bd66eb556814694b5c86a75ed9415a0a370e5c7d18ddbe',
        '0x9241ba9915e5beca7ab20fe0bf7c0d2523582ad39fe650f1edd53bc93b3c1dbd',
        '0xc6ed2b66f5e0938d3b66e9dac719cfce0569aaffe0f6cd1ca1d3026454db53c6',
        '0x8f7179fa64765fffa22cb1cfbfb58df733f5c77d68faa5e242810325e9073434',
        '0x075d57f067eec8b40e78f7368c1ca5dc12cf822f5652a305cd18fab10be7b45f',
        '0x090ce120c90b0e2617a1466312e400cc905b45ae0214575318d7f8f80931b7bc',
        '0xf5cc7e507a6058ecc4aa200d5bf2ee33d1ab0f5d540b0abb763687ee6bfdb08a',
        '0x3b04d5125d910d3217451bc0e4996deff9570aadacf2239dab6a1101372bd484',
        '0x54355c96cd668557bf683800e4a89eb569d2e9abb50cbcf1cd70fd329adfca0d',
        '0x69169ac4b5b64114eed86b1982ca8e259887f378703d651ea5551352ebf10228',
        '0x0fbdd71b0d0efc9510e22e4e036ef175ffcd6534dcd18bdfd229f7f151d31948',
        '0x56a3a19c54c9e88f19ca603e0f427b94829e0ca4dbeb2937b780b92a563b7c41',
        '0x31d479b72486eb8eedeec6b9351f34b47a3f4a4c5e98aa422533e6195ddd21a2',
        '0x5529b80b59fc086293707dc05e18614ca0869835d43cd11a2d171ed7531b5932',
        '0x5cb5e8cdcb190a8aef96da167c98dd5a8427a92e23809e02b7d63d908a8c2f9f',
        '0xa03b63f4f574b1ca2943617e8b7939ebea1526c59feb6dc83c285fa8fb987ce8',
        '0xe8cef848889bb1becf30fd1c33883aa673b621f0643eabf662fe9133072ec68d',
        '0x4b3ff142cf371c6cbcfc5b227a2b0bf700e7dfa22ee14d3d553109429369e59a',
        '0x7114ec9b7ee312736a9b6ca00236f9c02c558caa9c6a2e0f4023d4dff6ed7ae8',
        '0xdfdc488fa8888f6740d2bfb9ad6cd18aaf804772cc136023dfc287cc7c71603c',
        '0xc0608d5918b01e9df0d4ede4e63b2bad50ccdcbeda3221931b3577213dce1520',
        '0xdc52816e59b2070b4e813af5edbf47b0832726c2c88b2251645cfdd905525981',
        '0x4991ae3179da780d5c752c64e1ca909284bfa83a89bf48f3f827968f1f234634',
        '0x1ab800977269ee0b842189e996efb5e67a0b8c6faaed27cb999899080435bde9',
        '0xb1d2cb5bf6294edb81f5e86d43a803042fceee7e79eafa9a8cc2c2b8cf92d7c6',
        '0x1ddecd2f36ff24c696ae06b34392aa9cfcf6c7a17dd90975df2397d1705bb6ca',
        '0x56357bdb3fd96d0ca0fc873b5043b25824977ab2cc4d03cbcc0208963e721c81',
        '0x1c4f182d637b2377bc41cf9e155dbf6fdc5ac200292acb99cef9119af11f90c2',
        '0xe16d6b0cbfea1a5b7af606a8fc1d0a343223491e4aad968002704d953a5b42ef',
        '0xed1d7b9901369d6298adce8aa7d1d538834564b666250cce97365ee5de64a2f7',
        '0x7cc22bb5c3f3b175911ce11973e7913cbd6f2e84fb0ba1e616dffd75be3c0683',
        '0x75b6f8d1addf0a346466dfe94a5f23e5ea7f3a98a1ed638086a51587ad132bc2',
        '0xce9505caa099cbab45f52168624597bb48ce696ca09a6faf6c14b93f835e8f09',
        '0x663b9384e1a64320d1961e90a00c3b59df67e3731fd3cbb5fea5601109d08c1a',
        '0xbe2b23049f5d72dde8f2aa2be85a51e5b27fa03e1d6ca2ce43f6218aa64d9377',
        '0x08de71b724eb9406993e0f676a5bf6f5232ef5278573a20b30de191dee7fe208',
        '0x0e572593972bfcdd6114327e822d6bf6e6339d02e5e48f2fc092330aab7aab54',
        '0xdb03432700309f664d426f7c8cd60c474e7b5d9ae586030b562ee42cc52159ce',
        '0xe2e6f0364fa1b31b659c5264c9db66286baa520cbdbaf8c4ce496972fbc12710',
        '0xefe09c7fa42ea1bfe8c30e3ca78a2a45c52a6e19b255fe1a2d8dd5e159372b84',
        '0x4fdb59ccff3047d14066e84544aff964e4b5ee4c2aec01351ff58880de9a2cc2',
        '0x1075add42b81a78922bfee14a1bb7333c54e999c13953b59a04a30b52b80ea1e',
        '0xc9c7cf604b6c061bce99ddff60f8385162f55eb8e86c322308ee214f0f711446',
        '0x5858940436114a848c10795ce9cb80302e9bb30825f285411bb6b8fbea9b3d05',
        '0x6086163b43a50cbdd589ac1ca2ede41fdb2aaea5e9eff076741896db59dd4348',
        '0x01856fda17c3650c2e5f2636b169a39c25a5a9edf690d691562e8f63561fac04',
        '0x99dff1a3a85827c2ab805182eb03259bd0f6e25226a2ca5729eb87156e32db0a',
        '0x0aeb90be261e831426c5f48736858ddbcaa7ce78d624495810c890de79ef108d',
        '0xa37e6243fed3227479882a20d9bebe88127b71935e25779d0da902ea75d56c63',
        '0x78b158aeece6c3ddd351dc62c121d1f48cb71ae2cb51ddf0999f96d1d308f9e9',
        '0x5acddd78e2720fce8764816eb1abe2fdcc1ac41832a8bc6895ca72f9a58924c6',
        '0xa7de65d7d01d989604cfd501826d40a73d634857ecb79214d7cfe3ecdae6c95a',
        '0x19301e178d6fce221fca249fdced5f74150110d3a6cec3c70dec7c243a98dad9',
        '0x3deba8aa950c8560166c008c7e463bd7bf5620fe54179091bdd392abd01682d8',
        '0xaea40dd3b330644abe0885d2b3c1f0154a8d1909ec0f5cad090a2ff74cd016ef',
        '0x87a3feb25441a9c9b9e56a234fcae93b1bf02a18dee55d46cbca1ebe97ec1e3d',
        '0x35ce860ead38ceb09a4a3a3b95496c9b12cf243d038c445acf8a1ec183b91401',
        '0x141aa9685380975d8ca0ef24a38383103d8b2bce892de747ee98420844c73710',
        '0x7746613435c99fc5964c0e4fe0020c4987bb54b14c689b22f9f2a9bc7d551808',
        '0x04e7502cb05a2e817cafe3336b65f88d46410082d3093b7bacd126a064ca0005',
        '0xd009599a70a952b6ac5f5b497c1ea396e888cb89c6a6c4c3cdf9166a39225f38',
        '0xa6967c94bbef2526d41453788fc44eb2d40d9f8b7e67f75b29492cba7f9a8144',
        '0xae2665f2c01b13fee54fb2f973fc17196639b0457bc23ccf6d546943ec8d6f51',
        '0xc673a4d1526311e71e47b0ed4e7d8ad8a6b8604dcf73e6012d930da896f1a8f6',
        '0x07bd6327d1a1e0b202df022f5968aa7ad5f9f913b55cfeb3e66e39a6568faa16',
        '0x5564c002be9e5657329850b4b53cc80648afeaca6fe1508d7721cd17abae99ee',
        '0x2a874a4d274d0554a618454bdbbb71d9bbf7ea2a9baf8ca9820070c248834182',
        '0x63a729b882edac2110317e5780e5839347c88906668a2df6d23ac0b209989fb6',
        '0x92c783e83f05cc102b2d4e406fc9c54866de9f3c6ab158f10748dcc87c1cc2a9',
        '0xe9ea69f804c011ff3b443708c6612f08f58af39ebd0b7b24d3e76728b6d91422',
        '0xb8816be6e1b55b5bfc5384b774e45b5bdff0af0f097b9dce12200f8d09ba354a',
        '0xc59eb636121649dbeb1fa335897e2844bde5728096807b4202b6ed97d19985e6',
        '0xdaf6699eb2096710a71643b0ecb9adfcd212a9bf07dc9d875a6976a144904094',
        '0xb5cb6fa3c54161e3721eca93e76200f78048a016a85c2ab212f03a176cac59c3',
        '0x431b901b6a66bf27a2835b103703b64481cacdb7cbf19d5965bfef59c505a5c1',
        '0x1c5e63a2edfd97b2d7cb1d58f92f42376d06248433a3eb85b07b2da0b4da03e7',
        '0x2149f5fe46501542bcbb7399ddca1a06b02075ac4f7c7b7a09aeddfc2f00f4da',
        '0x202856498bb91cae66607e512aa9522c054ae6a62594b734bbccfcba96f5e2b5',
        '0x26cb32d8550875b34487e2f9386e86e949888f57a7cf09056da9b0d8e0923b18',
        '0xe23e7236dcdb7ac54a45e6d9ff0dc549befd3efb0b233fedf86dfabdd272c1c5',
        '0x764742c2e8d2ee2dc51fbd8cca874ce79cb2952d6290080f460673cd518d49c3',
        '0x635010c2246629f7b50a91eb85f5a29a8a20bd2f25d8c75b75e2ddc59ad9d337',
        '0x17431352ee907a62175cdcd148def5a27f577894401896d2d1c0b0325a1681b4',
        '0x9fffe21be164945ff61b69dd2461f17adfeadfdef40b100b3e16b62889cd45ef',
        '0xeff3a10699f1c530ad5f22e44ede26f8597fe7846d68c11427808726296f1411',
        '0x8f22ad2955f6d051da6eaa009c2b6783acb0b2c5e5c0ed9daa14beb002fe24ac',
        '0xd37e4018347d0338d93a364ffa5e510fbf840d5a273808305aa12130fffaf140',
        '0x2d0e04dba0d7eeb7ebb33409f5e5f0606d46a4883eff1917a8165eec8a5a6e43',
        '0x02991cb6de25cd2a191790379fbe2ce1ab27f46cc2cdb6a303dc067ae81e341d',
        '0xe199f0b470bd08358ab5589dc591aa9b0953b58a7ef10d3df52b79307ce1800f',
        '0x2cea0e0a75375f55ad00e0e44c604c05d17fc5470503558650e4ba27eb3a84f3',
        '0x2f1540ec1a0fd42631b32a5df3341b1e42fc9ee271c098af86ff2f05527aeb2e',
        '0x8559cb96b26d898dc833b8f3a20f614d057e8f449155316d97325482fad1fce4'
    ],
    transactionsRoot: '0x6646c0bc190d40692dcf8ec522c329ae2a5587891c72edb416e5a78ab7edc9c7',
    uncles: [],
    withdrawals: [
        [Object], [Object],
        [Object], [Object],
        [Object], [Object],
        [Object], [Object],
        [Object], [Object],
        [Object], [Object],
        [Object], [Object],
        [Object], [Object]
    ],
    withdrawalsRoot: '0x26242953f39dee6b0286baa44bf1cf00a0e2d1eec9b7d8a5ac8c5c5ec0ea09c0'
}


const exec = async () => {
    // const baseFeePerGas = formatEther(block.baseFeePerGas);
    // console.log({baseFeePerGas});
    // console.log({ethInDollars: Number(baseFeePerGas) * 3400});
    //
    // await getTokenPrice(Token.arb);
    // const ethPriceInDollars = await (await getTokenPrice(Token.eth)).USD;
    // console.log({ethPriceInDollars});


    //console.log(ethPriceInDollars * baseFeePerGas);
    // const gas = await client.estimateGas({
    //     account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    //     maxFeePerGas: parseGwei('20'),
    //     maxPriorityFeePerGas: parseGwei('2'),
    //     to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    //     value: parseEther('1')
    // });
    //
    // console.log({gas});

    // import {arbitrum} from 'viem/chains';
    //
    // const {maxFeePerGas, maxPriorityFeePerGas} = await client.estimateFeesPerGas({
    //     chain: arbitrum
    // }); // https://viem.sh/docs/chains/introduction.html
    //
    // console.log({maxFeePerGas});
    // console.log({maxPriorityFeePerGas});

    // await getCurrentGasPrices();

    // TODO: AXIOUS https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=YourApiKeyToken
    const resp_ok = {
        "status": "1",
        "message": "OK-Missing/Invalid API Key, rate limit of 1/5sec applied",
        "result": {
            "LastBlock": "19497566",
            "SafeGasPrice": "17",
            "ProposeGasPrice": "17",
            "FastGasPrice": "20",
            "suggestBaseFee": "16.34047424",
            "gasUsedRatio": "0.0746206,0.999313533333333,0.197209933333333,0.96604,0.356194866666667"
        }
    }
    const resp_not_ok = {
        "status": "0",
        "message": "NOTOK",
        "result": "Max rate limit reached, please use API Key for higher rate limit"
    }


    console.log(block.transactions[4]);
    //const tx: `0x${string}` = '0x80aed8e7b22ade179545694a36f35560fc45ef87a906449a78bc3052d358707d'
    //const tx: `0x${string}` = '0x9a5012f73589a81b478891218f732a70dd08f07fed7b21f9e7cca334aa3d7427'
    const tx: `0x${string}` = '0xe4ddaa27821771fc91f8dba100b20e78cea376c9468940c594bafff52d37706b'
    // = block.transactions[0] as `0x${string}`
    // https://etherscan.io/tx/0x9a5012f73589a81b478891218f732a70dd08f07fed7b21f9e7cca334aa3d7427
    // const transaction = await client.getTransaction({
    //     hash: tx
    // });


    // const transaction = await client.getTransaction({
    //     blockNumber: 19496952n,
    //     index: 0
    // });
    //
    //
    // console.log({tx});
    // console.log({transaction});

    const tx0 = {
        transaction: {
            blockHash: '0x75b2eb99d0a2346767724aa9eb58a390a0145c8e683bdbf66fe8d0a61746533a',
            blockNumber: 19496952n,
            from: '0x1ab4973a48dc892cd9971ece8e01dcc7688f8f23',
            gas: 100000n,
            gasPrice: 28119621992n,
            hash: '0x8628c778f6b89b000810a5cadc7bce17da03f8c8c43dfafeff0c83e18c351f3d',
            input: '0x',
            nonce: 247751,
            to: '0xee6705c4f0a5cd2f6612b678efd38d7524dc7537',
            transactionIndex: 0,
            value: 18165180000000000n,
            type: 'legacy',
            chainId: 1,
            v: 37n,
            r: '0xade5865f78604c47dc81ca603c0f7f3964bef93c695ecacc9f51eec56da91189',
            s: '0x2061850f7f5cb68fbcf8f6a832ae8b8cfe837eca3f6f977334c0dc3eddceafbc',
            typeHex: '0x0'
        }
    }

    /*const feeHistory = await client.getFeeHistory({
        blockCount: 4,
        // blockTag: 'safe',  // 'latest', 'earliest', 'pending', 'safe', 'finalized'

        blockNumber: 19496952n,
        rewardPercentiles: [25, 75]
    });

    console.log({feeHistory});*/

    const feeHistoryMock = {
        feeHistory: {
            baseFeePerGas: [
                17935313455n,
                16079900047n,
                18089213269n,
                19350950365n,
                18573138916n
            ],
            gasUsedRatio: [0.08619883333333334, 0.9998322666666667, 0.7790032, 0.33922],
            oldestBlock: 19496949n,
            reward: [[Array], [Array], [Array], [Array]]
        }
    }

    // const {gasPrice} = await client.estimateFeesPerGas({
    //     type: 'legacy',
    //     chain: mainnet
    // }); // TODO: EIP-1559
    // console.log({gasPrice});


}

const exec0 = async () => {


    const feeHistory = await client.getFeeHistory({
        blockCount: 4,
        rewardPercentiles: [25, 75]
    })
    // https://viem.sh/docs/actions/public/getFeeHistory.html
    console.log({feeHistory});


    // const transactions = await client.getTransactions(address);
    // fromBlock: "0x0",
    //     console.log(transactions);

    // { balanceAsEther: '0.002355109453380625' }
}
///exec0();


const exec111 = async () => {

}
exec111();
/*
 "paths": {
      "*": ["*"]
    },
 */
/*
const uniswapV3Contract = new ethers.Contract(uniswapV3Address, uniswapV3ABI, provider);

    const simulationResult = await simulateContract(uniswapV3Contract, 'swapExactTokensForTokens', [
        amountIn,
        amountOutMin,
        path,
        to,
        deadline
    ]);

    console.log(simulationResult);
 */