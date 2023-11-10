import {Module} from '@nestjs/common';
import {AppService} from './app.service';
import {AppController} from './app.controller';
import {RabbitModule} from "../rabbitmq/rmq.module";
import {ScamCheckModule} from "../app.scam.coin/scam.check.module";

@Module({
  imports: [RabbitModule, ScamCheckModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
