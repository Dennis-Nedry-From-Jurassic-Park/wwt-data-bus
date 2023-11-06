import {Inject, Injectable} from '@nestjs/common';
import {CreateAppDto} from './dto/create-app.dto';
import {UpdateAppDto} from './dto/update-app.dto';
import {AmqpConnection, RabbitSubscribe} from "@golevelup/nestjs-rabbitmq";
import {RabbitMQService} from "../rabbitmq/rmq.service";

@Injectable()
export class AppService {
    constructor() {

    }

    create(createAppDto: CreateAppDto) {
        return 'This action adds a new app';
    }

    findAll() {
        return `This action returns all app`;
    }

    findOne(id: number) {
        return `This action returns a #${id} app`;
    }

    update(id: number, updateAppDto: UpdateAppDto) {
        return `This action updates a #${id} app`;
    }

    remove(id: number) {
        return `This action removes a #${id} app`;
    }
}
