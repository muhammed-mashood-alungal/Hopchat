import { Transport, RmqOptions } from '@nestjs/microservices';
import { QUEUES } from './constants';

export const rabbitMQProducerConfig = (): RmqOptions => ({
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBIT_MQ_URL!],
    queue: QUEUES.TO_CLIENT_A,
    queueOptions: {
      durable: true,
    },
  },
});
