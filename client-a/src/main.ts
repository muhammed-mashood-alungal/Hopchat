import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { rabbitMQConsumerConfig } from './rabbitmq/rabbitmq.consumer.options';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('client-a');


  app.enableCors({
    origin: [process.env.CLIENT_URL],
    methods: ['GET', 'POST'],
  });

  app.connectMicroservice<MicroserviceOptions>(rabbitMQConsumerConfig());
  await app.startAllMicroservices();

  app.useGlobalFilters(new AllExceptionsFilter());

  const port = process.env.PORT || 5000;

  await app.listen(port, '0.0.0.0', () => {
    console.log('SERVER_1 STARTED '+port);
  });
}
bootstrap();
