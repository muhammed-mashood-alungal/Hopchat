// import { Transport, RmqOptions } from '@nestjs/microservices';


// export const rabbitMQConsumerConfig = (): RmqOptions => ({
//   transport: Transport.RMQ,
//   options: {
//     urls: [process.env.RABBIT_MQ_URL!],
//     queue: process.env.LISTEN_QUEUE!,
//     queueOptions: {
//       durable: true,
//     }, 
//     noAck: false,
//   },
// });
 import { Transport, RmqOptions } from '@nestjs/microservices';
import { QUEUES } from './constants';

export const rabbitMQConsumerConfig = (): RmqOptions => {
  console.log('Consumer Config - RABBIT_MQ_URL:', process.env.RABBIT_MQ_URL);
  console.log('Consumer Config - Queue:', QUEUES.TO_CLIENT_B);

  return {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBIT_MQ_URL!],
      queue: QUEUES.TO_CLIENT_B,
      queueOptions: {
        durable: true,
      },
      noAck: false, // Ensure manual acknowledgment
    },
  };
};