import {Controller, Get, Post, Body, Patch, Param, Delete, Logger, Inject} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';
import {RabbitMQService} from "../rabbitmq/rmq.service";
import {AMQ_DIRECT, EXCHANGE, ROUTING_KEY} from "../rabbitmq/rmq.common";
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";

@Controller('app')
export class AppController {
  @Inject()
  private readonly rabbitMQService: RabbitMQService

  constructor(
      private readonly appService: AppService,
  ) {

  }

  @Post('create')
  create(@Body() createAppDto: CreateAppDto) {
    return this.appService.create(createAppDto);
  }

  @Post('pub')
  async pub(@Body() msg: any): Promise<string> {
    try {
      Logger.error('receive: ');
      await this.rabbitMQService.amqpConnection.publish(AMQ_DIRECT, ROUTING_KEY, JSON.stringify(msg))
    } catch (err: any) {
      Logger.error('not receive msg: ' + err);
    }

    return 'success' //this.rmqService.competingPubSubHandler(msg);
  }

  @Get('getAll')
  findAll() {
    return this.appService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppDto: UpdateAppDto) {
    return this.appService.update(+id, updateAppDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appService.remove(+id);
  }
}
