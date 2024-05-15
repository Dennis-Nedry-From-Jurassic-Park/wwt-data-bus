# https://ethereum.org/en/developers/docs/standards/tokens/erc-20/

https://github.com/mikeshultz/py4byte
https://github.com/topics/4byte

```py
def getTokenTransactions(wallet_address, api_key):
url = f"https://api.etherscan.io/api?module=account&action=tokentx&address={wallet_address}&startblock=0&endblock=999999999&sort=asc&apikey={api_key}"
response = requests.get(url)
data = response.json()

if data["status"] == "1" and data["message"] == "OK":
    return data["result"]
else:
    return []
```