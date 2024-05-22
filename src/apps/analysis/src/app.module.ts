import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {Hex} from "../../../bot/utils/hex";
import {ClickHouseClient, ClickHouseModule} from "@depyronick/nestjs-clickhouse";
import {defaultOptions} from "../../../db/clickhouse/config";

@Module({
  imports: [
    ClickHouseModule.register(defaultOptions)
  ],
  controllers: [AppController],
  providers: [AppService, Hex, ClickHouseClient],
})
export class AppModule {}
