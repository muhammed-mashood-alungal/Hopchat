import { Transport, RmqOptions } from '@nestjs/microservices';
import { QUEUES } from './constants';

export const rabbitMQConsumerConfig = (): RmqOptions => {
  return {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBIT_MQ_URL!],
      queue: QUEUES.TO_CLIENT_B,
      queueOptions: {
        durable: true,
      },
      noAck: false, 
    },
  };
};