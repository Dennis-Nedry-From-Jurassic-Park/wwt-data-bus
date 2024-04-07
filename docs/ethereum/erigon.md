# install
https://magnushansson.xyz/blog_posts/crypto_defi/2021-12-27-Run-Erigon-Archive-Node
Otterscan is an Ethereum block explorer designed to be run locally with Erigon. Otterscan is a patched version of Erigon
https://github.com/otterscan/otterscan.git
https://github.com/otterscan/otterscan#otterscan-json-rpc-api-extensions
https://github.com/ethereum-lists/4bytes
https://github.com/otterscan/otterscan/blob/develop/docs/custom-jsonrpc.md
https://erigon.gitbook.io/erigon/eli5-nodes/how-to-run-an-ethereum-node
https://sepolia.otterscan.io/address/0xAC9b10a9E3F24AA3ba5Df76F75221fB7801438B3
https://scan.builder0x69.io/
https://scan.builder0x69.io/address/0xAC9b10a9E3F24AA3ba5Df76F75221fB7801438B3

https://www.testinprod.io/our-works

# method
swapExactETHForTokensSupportingFeeOnTransferTokens
https://scan.builder0x69.io/tx/0xcf2d6682bd764793987b2e50e7805e5d1b31594057561a843a078bb1af7925e4


https://hub.docker.com/search?q=erigon
https://hub.docker.com/r/thorax/erigon/tags
https://hub.docker.com/r/gatewayfm/erigon-tools
https://ethereum.org/en/developers/docs/nodes-and-clients/#erigon
https://hub.docker.com/r/chainstack/erigon/tags
https://gitlab.com/pulsepiplus-development/pulsepiplus
https://erigon.gitbook.io/erigon/eli5-nodes/how-to-run-an-ethereum-node

# cmd command
./build/bin/erigon --http.addr="0.0.0.0" --http.api=eth,web3,net,debug,trace,txpool
--chain=mainnet
--chain=sepolia
--http.addr="0.0.0.0" --http.api=eth,web3,net,debug,trace,txpool
--torrent.download.rate=512mb
# NVME M2
Used enterprise sata SSDs are super cheap. You can get a 2 TB for like 50 USD that still have hundreds of TBW or even over a PBW remaining.
https://club.dns-shop.ru/review/t-107-jestkie-diski/8225-obzor-jestkogo-diska-wd-re-4tb-perevod/
https://docs.google.com/spreadsheets/d/1vlixCB8T782iJ6mC07MGLRuhVsuprSZwSj3xMXB1IrA/edit#gid=0
# tips
**--snap.stop**
Другой пользователь отметил, что без --snap.stopфлага их RPC отставал до 30 блоков, 
обычно 6-10, что указывает на то, 
что время задержки может быть значительным при определенных условиях
# консенсус
Erigon with Caplin означает интеграцию Caplin как уровня полного консенсуса 
в клиенте Erigon Ethereum. Caplin спроектирован как полноценный клиент проверки консенсуса, 
похожий на другие клиенты, такие как Prysm, Lighthouse, Teku, Nimbus и Lodesta

Erigon изначально не был разработан с учетом API Engine, 
который отправляет данные по одному блоку за раз, что плохо согласуется с архитектурой Erigon,
оптимизированной для одновременной обработки множества блоков. 
Это привело к решению разработать Caplin для независимой обработки блоков, 
тем самым повысив эффективность и пригодность для операций Erigon

Caplin еще не готов к размещению ставок,
и включение Beacon API приведет к дополнительному использованию 6 ГБ ОЗУ

# https://ethereum.org/en/developers/docs/nodes-and-clients/run-a-node/
# Requirements
![img.png](img.png)

К счастью, в Geth есть две опции: datadirи datadir.ancient. 
Используя эти две опции при запуске нашего узла geth, 
мы можем указать место на отдельном диске для наших древних и активных данных

```bash
geth --http --http.api personal,eth,net,web3 
--datadir C:\ETH\Node 
--datadir.ancient F:\ETH\Node\geth\chaindata\ancient
```

https://www.reddit.com/r/ethstaker/comments/13ane8p/syncing_an_erigon_node/
https://github.com/ledgerwatch/erigon/blob/devel/eth/stagedsync/README.md


https://3dnews.ru/998553/obzor-wd-gold-4-tb-wd4003fryz
Ultrastar DC HS760
https://www.citilink.ru/catalog/ssd-nakopiteli--ssd-s-nvme/?sorting=price_asc&pf=discount.any%2Crating.any%2C8721_580mb72d12280%2C10746_580&f=discount.any%2Crating.any%2C8721_580mb72d12280%2C10746_580&r=25267_580%3A4-512

MSI Spatium M480 Pro 4ТБ, M.2 2280, PCIe 4.0 x4, NVMe, M.2 [s78-440r050-p83]
https://www.citilink.ru/product/ssd-nakopitel-msi-spatium-m480-pro-4tb-m-2-2280-pcie-4-0-x4-nvme-m-2-s-1988053/

Patriot Viper VP4300 Lite VP4300L4TBM28H 4ТБ, M.2 2280
https://www.citilink.ru/product/ssd-nakopitel-patriot-viper-vp4300-lite-vp4300l4tbm28h-4tb-m-2-2280-pc-1981329/
https://www.citilink.ru/product/adapter-pci-e-m-2-ngff-for-ssd-bulk-1083421/


But, I forgot to say, current server have 64GB RAM. 35GB is free
**To mine ETH, you need enough RAM to build the DAG**
DAG SIZE CALCULATOR
19496952, and current
DAG Size is 6.07 GB
5743248, and current 
DAG size is 2.49 GB.
https://investoon.com/tools/dag_size

~~https://www.nix.ru/autocatalog/hdd_western_digital/HDD-4-Tb-SATA-6Gb-s-Western-Digital-RE-WD4000FYYZ-35-7200rpm-64Mb_144552.html~~
~~https://qna.habr.com/q/942263~~
~~WD4000FYYZ~~
До 171 Мб/сек

https://www.nix.ru/price/price_list.html?section=hdd_all#c_id=103&enums%5B592%5D%5B%5D=309&enums%5B1069%5D%5B%5D=8&enums%5B2311%5D%5B%5D=5&fn=103&g_id=12&new_goods=0&page=1&sort=&spoiler=&store=msk-0_1721_1&thumbnail_view=2
https://www.nix.ru/autocatalog/hdd_toshiba/HDD-4-Tb-SATA-6Gb-s-Toshiba-MG08ADA400N-35_524960.html

https://ethereum.stackexchange.com/questions/151619/can-you-run-an-ethereum-node-with-a-usb-3-2-ssd

https://ethereum.stackexchange.com/questions/156235/samsung-870-qvo-8tb-erigon-archive
I read that despite being an SSD with 560mb/sR and 530mb/sW this QVO is poor at syncing Eth nodes.

Minimum requirements
CPU with 2+ cores
8 GB RAM
2TB SSD
10+ MBit/s bandwidth
Recommended specifications
Fast CPU with 4+ cores
16 GB+ RAM
Fast SSD with 2+TB
25+ MBit/s bandwidth

# install on linux
https://surfthedream.com.au/setting-up-a-full-erigon-ethereum-node/
# install on windows

1) git clone --branch v2.59.3 --single-branch https://github.com/ledgerwatch/erigon.git
2) install go to Program Files
3) install chocolate (win10 tool)
4) choco install mingw
5) .\wmake.ps1 erigon


# https://github.com/ledgerwatch/erigon?tab=readme-ov-file#testnets