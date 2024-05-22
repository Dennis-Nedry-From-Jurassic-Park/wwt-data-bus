import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {Hex} from "../../../bot/utils/hex";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, Hex],
})
export class AppModule {}
