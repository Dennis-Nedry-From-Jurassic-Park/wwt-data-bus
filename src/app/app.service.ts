import {Injectable} from '@nestjs/common';
import {CreateAppDto} from './dto/create-app.dto';
import {UpdateAppDto} from './dto/update-app.dto';

import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
    constructor() {
        const data_source = new DataSource({
            type: 'postgres',
            url: db_config.postgres.connect_url,
            synchronize: false,
            logging: db_config.postgres.enable_logging,
            entities: [],
        });
        await data_source.initialize();
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
