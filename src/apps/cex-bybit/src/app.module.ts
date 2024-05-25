import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {BybitWebSocketGateway} from "./websocket-gateway";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, BybitWebSocketGateway],
})
export class AppModule {}
