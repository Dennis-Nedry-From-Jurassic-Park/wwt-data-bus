import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {BybitWebSocketGateway} from "./websocket-gateway";
import {ClickHouseModule} from "@depyronick/nestjs-clickhouse";
import {defaultOptions} from "../../../db/clickhouse/config";

@Module({
  imports: [
    ClickHouseModule.register(defaultOptions)
  ],
  controllers: [AppController],
  providers: [AppService, BybitWebSocketGateway],
})
export class AppModule {}
