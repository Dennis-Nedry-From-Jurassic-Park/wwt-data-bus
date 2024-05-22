import {Inject, Injectable} from '@nestjs/common';
import {Hex} from "../../../bot/utils/hex";
import {ClickHouseClient} from '@depyronick/nestjs-clickhouse';
import {token} from "../../../db/clickhouse/config";
import {Provider} from "../../../bot/provider";
import {erc20Abi} from "abitype/abis";
import {PriceOracle} from "../../../bot/price-oracle";
import {Temp} from "../../../db/clickhouse/table/wwt.temp";

@Injectable()
export class AppService {
    constructor(
        private readonly hex: Hex,
        private readonly provider: Provider,
        private readonly priceOracle: PriceOracle,
        @Inject(token)
        private clickHouseClient: ClickHouseClient
    ) {

    }

    async getHex(): Promise<any> {
        const res = await this.clickHouseClient.query("select now()")
        console.log({res});
        //this.hex.to_datetime('0x').toUTCString();
        return this.provider.test()
    }

    isERC721 = async (address: `0x${string}`) => { // TODO: NFT
        const ERC721_ABI = []
        const contract = new this.provider.web3.eth.Contract(ERC721_ABI, address);
        try {
            await contract.methods.ownerOf().call();
            return true;
        } catch (error) {
            return false;
        }
    }

    isERC20 = async (address: `0x${string}`): Promise<any> => {
        const contract = new this.provider.web3.eth.Contract(erc20Abi, address);
        try {
            await contract.methods.totalSupply().call();
            return true;
        } catch (error) {
            return false;
        }
    }

    test = async (): Promise<any> => {
        return "test" //this.provider.etherscan.stop()
    }

    fetch = async (): Promise<any> => {
        let next = null;
        let page = 1;
        let data = []
        do {
            const networks = await this.priceOracle.geckoTerminalApiV2.getNetworks(page)
            data = [...data,...networks.data];
            const links = networks.links
            next = links.next
            this.clickHouseClient.insert<Temp>("wwt.temp", [
                    {
                        timestamp: Date.now(), // +new Date()
                        api: "geckoTerminalApiV2",
                        method: "getNetworks",
                        data: networks,
                        address: "",
                        next: next
                    }
                ]
            ).subscribe({
                error: (err: any): void => {
                    console.error({err});
                },
                next: (): void => {
                    // currently next does not emits anything for inserts
                },
                complete: (): void => {
                    // called when insert is completed
                },
            });

            console.log({
                next: next,
                page: page,
                links: links,
            });

            page += 1
        } while (next);

        return data
    }

}
