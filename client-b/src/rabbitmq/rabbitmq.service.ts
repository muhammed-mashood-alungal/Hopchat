import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { rabbitMQProducerConfig } from './rabbitmq.producer.options';

@Injectable()
export class RabbitmqService {
  private client: ClientProxy;
  constructor() {
    this.client = ClientProxyFactory.create(rabbitMQProducerConfig());
  }

  async sendMessage(pattern: string, data: any) {
    console.log('EMITING')
     this.client.emit(pattern, data);
  }
}
