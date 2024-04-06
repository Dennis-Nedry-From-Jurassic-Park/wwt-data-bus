# erc20
https://docs.openzeppelin.com/contracts/2.x/api/token/erc20
https://eips.ethereum.org/EIPS/eip-20
# erc721 NFT
https://portal.thirdweb.com/references/typescript/v4/Erc721
https://docs.openzeppelin.com/contracts/2.x/api/token/erc721
# ERC-1155


```py
import requests
import json

def check_nft_ownership(contract_address, token_id, address):
    url = "http://localhost:8545" # Replace with your Erigon JSON-RPC daemon URL
    headers = {"Content-Type": "application/json"}
    data = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "eth_call",
        "params": [
            {
                "to": contract_address,
                "data": "0x" + function_signature + token_id + address
            },
            "latest"
        ]
    }
    response = requests.post(url, headers=headers, data=json.dumps(data))
    result = response.json()['result']
    # Process the result to determine ownership
    return result

```


