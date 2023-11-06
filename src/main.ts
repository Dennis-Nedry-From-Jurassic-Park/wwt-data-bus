import {json} from 'body-parser';
import {NestFactory} from "@nestjs/core";
import {AppModule} from './app/app.module';
import {Logger} from "@nestjs/common";
import {FastifyAdapter, NestFastifyApplication} from "@nestjs/platform-fastify";

async function bootstrap() {
    // https://github.com/CoinCatEx/nestjs-rabbitmq
    // const amqp = await NestFactory.create(
    //     RabbitModule.forRoot({
    //         host: process.env.AMQP_QUEUE_HOST,
    //         port: parseInt(process.env.AMQP_QUEUE_PORT, 3),
    //         login: process.env.AMQP_QUEUE_LOGIN,
    //         password: process.env.AMQP_QUEUE_PASSWORD,
    //         tasksQueueNormal: process.env.AMQP_QUEUE_COMMAND_REQUEST,
    //         tasksQueueRedelivery: process.env.AMQP_QUEUE_REQUEST_ONCE_DELIVERY,
    //         deadLetterRoutingKey: process.env.AMQP_QUEUE_COMMAND_REQUEST_DEAD_LETTER,
    //         deadLetterRoutingKeyRedelivery:
    //         process.env.AMQP_QUEUE_COMMAND_REQUEST_ONCE_DELEVERY_DEAD_LETTER,
    //         exchange: process.env.AMQP_EXCHANGE_COMMAND,
    //         prefetch: parseInt(process.env.AMQP_QUEUE_PREFETCH, 3),
    //     }),
    // );
    //const amqpTransport = amqp.get<RabbitTransport>(RabbitTransport);
    // https://docs.nestjs.com/techniques/performance
    const options = { bodyParser: false }
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), options);
    app.use(json({ limit: '16mb' }));
    // app.connectMicroservice({
    //     strategy: amqpTransport,
    //     options: {},
    // });
    await app.startAllMicroservices();
    Logger.error('init nestjs')

    await app.listen(3000, '0.0.0.0', () => console.log(`Listening on port: 3000`));
}
// https://docs.nestjs.com/techniques/performance
bootstrap()
    .catch(err => {
        Logger.error(err)
        console.error(err)
    });