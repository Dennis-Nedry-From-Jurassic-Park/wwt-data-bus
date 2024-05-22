import {Inject, Injectable} from '@nestjs/common';
import {Hex} from "../../../bot/utils/hex";
import { ClickHouseClient } from '@depyronick/nestjs-clickhouse';
import {token} from "../../../db/clickhouse/config";

@Injectable()
export class AppService {
  constructor(
      private readonly hex: Hex,
      @Inject(token)
      private clickHouseClient: ClickHouseClient
  ) {}

  async getHex(): Promise<any> {
    const res = await this.clickHouseClient.query("select now()")
    console.log({res});
    //this.hex.to_datetime('0x').toUTCString();
    return res
  }
}
