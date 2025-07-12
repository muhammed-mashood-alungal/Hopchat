import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { rabbitMQConsumerConfig } from './rabbitmq/rabbitmq.consumer.options';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('client-a');

  console.log(process.env.CLIENT_URL)
  app.enableCors({
    origin: [process.env.CLIENT_URL],
    methods: ['GET', 'POST'],
  });

  console.log('Server_1 - Connecting microservice...');
  app.connectMicroservice<MicroserviceOptions>(rabbitMQConsumerConfig());
  await app.startAllMicroservices();
  console.log('Server_1 - Microservices started');

  app.useGlobalFilters(new AllExceptionsFilter())

  const port = process.env.PORT || 5000;

  await app.listen(port,()=>{
    console.log('SERVER-1 STARTED')
  });
}
bootstrap();
