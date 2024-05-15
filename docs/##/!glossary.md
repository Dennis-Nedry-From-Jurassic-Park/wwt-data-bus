


**Секвенсоры** отвечают за заказ транзакций из mempool 
и последующую отправку информации на виртуальную машину. 
Подобно валидаторам в сети первого уровня, они играют важную роль в работе блокчейн-сетей второго уровня

**transactionIndexEthereum** обозначает позицию транзакции внутри блока
числовое значение, которое однозначно идентифицирует позицию транзакции среди всех транзакций, включенных в этот блок

**typeHex**
EIP-2718
number between 0 and 0x7f, representing a total of 128 possible transaction type
The transaction type is encoded using Recursive Length Prefix (RLP) encoding, 
a space-efficient serialization method used in Ethereum
typeHex=0x2
RLP( [nonce, gasPrice, gasLimit, to, value, data, v, r, s] )

**Homestead**
In the context of Ethereum and the ethers.js library, "Homestead" refers to the mainnet, 
which is the public, production version of the Ethereum blockchain. 
The term "Homestead" is used to denote the latest release of the Ethereum protocol 
that the mainnet nodes are running.