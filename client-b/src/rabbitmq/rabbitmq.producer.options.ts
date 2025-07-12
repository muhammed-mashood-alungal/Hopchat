import { Transport, RmqOptions } from '@nestjs/microservices';
import { QUEUES } from './constants';

export const rabbitMQProducerConfig = (): RmqOptions => {
  console.log('Producer Config - RABBIT_MQ_URL:', process.env.RABBIT_MQ_URL);
  console.log('Producer Config - Queue:', QUEUES.TO_CLIENT_A);

  return {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBIT_MQ_URL!],
      queue: QUEUES.TO_CLIENT_A,
      queueOptions: {
        durable: true,
      },
    },
  };
};