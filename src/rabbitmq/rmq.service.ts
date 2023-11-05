import {Inject, Injectable, Logger} from "@nestjs/common";
import {AmqpConnection, RabbitRPC, RabbitSubscribe} from "@golevelup/nestjs-rabbitmq";
import {CHANNEL, EXCHANGE, QUEUE, ROUTING_KEY} from "./rmq.common";
import {Channel, ConsumeMessage} from 'amqplib'

@Injectable()
export class RabbitMQService {
    constructor(
        public readonly amqpConnection: AmqpConnection
    ) {}

    @RabbitSubscribe({
        exchange: 'amq.direct',
        routingKey: ROUTING_KEY,
        queue: QUEUE,
        errorHandler: (channel: Channel, msg: ConsumeMessage, error: Error) => {
            console.log('1111')
            console.log(error)
            channel.reject(msg, false)
        }
    })
    public async onQueueConsumption(msg: {}, amqpMsg: ConsumeMessage) {
        const eventData = JSON.parse(amqpMsg.content.toString())
        // do something with eventData
        console.log(`EventData: `)
        console.log(eventData);
    }

    pub(
        exchange: string,
        routingKey: string,
        message: string,
    ) {
        this.amqpConnection
            .publish('amq.direct', routingKey, message, {})
            .catch(err => console.log(err))
    }

    // @RabbitRPC({
    //     exchange: EXCHANGE,
    //     routingKey: ROUTING_KEY,
    //     queue: QUEUE ,
    //     queueOptions: {
    //         channel: CHANNEL,
    //     },
    // })
    // public async rpcHandler(msg: {}) {
    //     console.log(`Received rpc message: ${JSON.stringify(msg)}`);
    //
    //     return { message: 'hi' };
    // }

    // @RabbitSubscribe({
    //     exchange: EXCHANGE,
    //     routingKey: ROUTING_KEY,
    //     queue: 'subscribe-queue-1',
    //     //queue: 'subscribe-stream-queue-1',
    // })
    // competingPubSubHandler(msg: string) {
    //     Logger.error(`Received message: ${JSON.stringify(msg)}`);
    //     return JSON.stringify(msg)
    // }


}
