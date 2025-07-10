import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
     transport : Transport.RMQ,
     options: {
      urls : [process.env.RABBIT_MQ_URL!],
      queue: process.env.LISTEN_QUEUE!,
      queueOptions: {
        durable: true,
      }
     }
  })

  await app.startAllMicroservices()

  const port = process.env.PORT || 5000 

  await app.listen(port);
}
bootstrap();
