import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {Hex} from "../../../bot/utils/hex";
import {ClickHouseClient, ClickHouseModule} from "@depyronick/nestjs-clickhouse";
import {defaultOptions} from "../../../db/clickhouse/config";
import {Provider} from "../../../bot/provider";

@Module({
  imports: [
    ClickHouseModule.register(defaultOptions)
  ],
  controllers: [AppController],
  providers: [AppService, Hex, ClickHouseClient, Provider],
})
export class AppModule {}
