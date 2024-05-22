import {Inject, Injectable} from '@nestjs/common';
import {Hex} from "../../../bot/utils/hex";
import { ClickHouseClient } from '@depyronick/nestjs-clickhouse';
import {token} from "../../../db/clickhouse/config";
import {Provider} from "../../../bot/provider";
import {erc20Abi} from "abitype/abis";

@Injectable()
export class AppService {
  constructor(
      private readonly hex: Hex,
      private readonly provider: Provider,
      @Inject(token)
      private clickHouseClient: ClickHouseClient
  ) {}

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
}
