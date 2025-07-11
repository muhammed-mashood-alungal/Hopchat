import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';

import { lastValueFrom } from 'rxjs';
import { rabbitMQProducerConfig } from './rabbitmq.producer.options';

@Injectable()
export class RabbitmqService {
  private client: ClientProxy;
  constructor() {
    this.client = ClientProxyFactory.create(rabbitMQProducerConfig());
  }

  async sendMessage(pattern: string, data: any) {
   const res = await this.client.emit(pattern, data)
  }
}
