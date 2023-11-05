import {Global, Module} from "@nestjs/common";
import {AmqpConnection, RabbitMQModule} from "@golevelup/nestjs-rabbitmq";
import {RabbitMQService} from "./rmq.service";
import {EXCHANGE} from "./rmq.common";

@Global()
@Module({
    imports: [
        RabbitMQModule.forRoot(RabbitMQModule, {
            // TODO: https://www.rabbitmq.com/streams.html
            exchanges: [
                // {
                //     name: EXCHANGE,
                //     type: 'topic',
                // },
                {
                    name: 'amq.direct',
                    type: 'direct'
                }
            ],
            channels: {
                'channel-a': {
                    prefetchCount: 1,
                    default: true,
                }
            },
            uri: 'amqp://zowie:2840@localhost:5672',
            connectionInitOptions: { wait: false },
            enableControllerDiscovery: true
        }),
    ],
    providers: [RabbitMQService],
    exports: [RabbitMQService],
    controllers: [],
})
export class RabbitModule {}

// import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
// import { Module } from '@nestjs/common';
// import { MessagingController } from './messaging/messaging.controller';
// import {MessagingService} from "./msg.service";
//
// @Module({
//     imports: [
//         RabbitMQModule.forRoot(RabbitMQModule, {
//             exchanges: [
//                 {
//                     name: 'exchange1',
//                     type: 'topic',
//                 },
//             ],
//             uri: 'amqp://rabbitmq:rabbitmq@localhost:5672',
//             channels: {
//                 'channel-1': {
//                     prefetchCount: 15,
//                     default: true,
//                 },
//                 'channel-2': {
//                     prefetchCount: 2,
//                 },
//             },
//         }),
//         RabbitExampleModule,
//     ],
//     providers: [MessagingService],
//     controllers: [MessagingController],
// })
// export class RabbitExampleModule {}