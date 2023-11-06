import {json} from 'body-parser';
import {NestFactory} from "@nestjs/core";
import {AppModule} from './app/app.module';
import {Logger} from "@nestjs/common";
import {FastifyAdapter, NestFastifyApplication} from "@nestjs/platform-fastify";

async function bootstrap() {
    // TODO: https://github.com/CoinCatEx/nestjs-rabbitmq
    const options = { bodyParser: false }
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), options);
    app.use(json({ limit: '16mb' }));
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