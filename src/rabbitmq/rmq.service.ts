import {Inject, Injectable, Logger} from "@nestjs/common";
import {AmqpConnection, RabbitRPC, RabbitSubscribe} from "@golevelup/nestjs-rabbitmq";
import {AMQ_DIRECT, CHANNEL, EXCHANGE, QUEUE, ROUTING_KEY, ROUTING_KEY_ERROR} from "./rmq.common";
import {Channel, ConsumeMessage} from 'amqplib'

@Injectable()
export class RabbitMQService {
    constructor(
        private readonly _amqpConnection: AmqpConnection
    ) {}

    @RabbitSubscribe({
        exchange: AMQ_DIRECT,
        routingKey: ROUTING_KEY,
        queue: QUEUE,
        errorHandler: async (channel: Channel, msg: ConsumeMessage, error: Error) => {
            const body = {
                error: error,
                msg: msg
            }
            console.log(body)

            // if(this!) {
            //     await this!.amqpConnection.publish(AMQ_DIRECT, ROUTING_KEY_ERROR, body)
            // } else {
            //     Logger.error('amqpConnection is undefined')
            // }

            channel.reject(msg, false)
        }
    })
    public async onQueueConsumption(msg: {}, amqpMsg: ConsumeMessage ) {
        const eventData: any = JSON.parse(amqpMsg.content /* BufferType */)
        console.log(eventData);
        console.log(eventData.body);
    }

    get amqpConnection(): AmqpConnection {

        return this._amqpConnection
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
