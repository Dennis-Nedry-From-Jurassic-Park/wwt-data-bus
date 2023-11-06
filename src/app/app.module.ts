import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import {RabbitModule} from "../rabbitmq/rmq.module";
import {RabbitMQService} from "../rabbitmq/rmq.service";
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";

@Module({
  imports: [RabbitModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
