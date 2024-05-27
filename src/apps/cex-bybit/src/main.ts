import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {FastifyAdapter} from "@nestjs/platform-fastify";

async function bootstrap() {
  const app = await NestFactory.create(
      AppModule,
      new FastifyAdapter({ logger: true }),
      { bufferLogs: true }
  );
  await app.listen(3000);
}
bootstrap();
// TODO: https://www.dropstab.com/p/cool-head-7xjurwmfvt
