import {Account, Contract, RpcProvider} from 'starknet';

const provider = new RpcProvider({nodeUrl: "http://127.0.0.1:5050/rpc"}); // only for starknet-devnet-rs

//const provider = new Provider({sequencer: {baseUrl: 'http://127.0.0.1:5050'}});
// initialize existing pre-deployed account 0 of Devnet
const privateKey
    = '0x7ae22ba5f03441cb9937f3982c22fbd2';
const accountAddress
    = '0x7b6e0367001cc81aea00bab35e7febd7e02b77e97f8be2233a4d25d4971b859';

const account = new Account(provider, accountAddress, privateKey);


const exec = async () => {
    const chain = await provider.getChainId(); // <- Get latest block
    console.log({chain});

    const pendingTx = await provider.getPendingTransactions();
    console.log({pendingTx});


    //const contract = new Contract(abi_erc20, contractAddress, starknet.account);
    //const balance = await contract.balanceOf(starknet.account.address);

    const testAddress = '0x5f7cd1fd465baff2ba9d2d1501ad0a2eb5337d9a885be319366b5205a414fdd';

// read abi of Test contract
    const {abi: testAbi} = await provider.getClassAt(testAddress);
    if (testAbi === undefined) {
        throw new Error('no abi.');
    }
    const myTestContract = new Contract(testAbi, testAddress, provider);

// Interaction with the contract with call
    const bal1 = await myTestContract.get_balance();
    console.log('Initial balance =', bal1.res.toString());
}
exec();