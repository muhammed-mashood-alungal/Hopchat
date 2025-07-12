import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { rabbitMQConsumerConfig } from './rabbitmq/rabbitmq.consumer.options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('client-b');
  
  app.enableCors({
    origin: [process.env.CLIENT_URL],
    methods: ['GET', 'POST'],
  });

  console.log('INITIALISIING')
  console.log(process.env)

  app.connectMicroservice<MicroserviceOptions>(rabbitMQConsumerConfig());

  await app.startAllMicroservices();
  
  const port = process.env.PORT || 5001;
  await app.listen(port, () => {
    console.log('SERVER-2 STARTED'+ port);
  });
}
bootstrap();
