import { Transport, RmqOptions } from '@nestjs/microservices';

export const rabbitMQConsumerConfig = (): RmqOptions => ({
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBIT_MQ_URL!],
    queue: process.env.LISTEN_QUEUE!,
    queueOptions: {
      durable: true,
    },
    noAck: false,
  },
});
 