import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { rabbitMQProducerConfig } from './rabbitmq.producer.options';
import { lastValueFrom, retry } from 'rxjs';
import { errorMessages } from 'src/common/constants/error-messages.constants';

@Injectable()
export class RabbitmqService {
  private client: ClientProxy;
  constructor() {
    this.client = ClientProxyFactory.create(rabbitMQProducerConfig());
    this.connectWithRetry();
  }

  private async connectWithRetry() {
    try {
      await this.client.connect();
    } catch (err) {
      console.error('RabbitMQ connection failed:', err.message);
      setTimeout(() => this.connectWithRetry(), 5000);
    }
  }

  async sendMessage(pattern: string, data: any) {
    try {
      const observable$ = this.client.emit(pattern, data).pipe(retry(3));
      return await lastValueFrom(observable$);
    } catch (error) {
      throw new InternalServerErrorException(errorMessages.MESSAGE_SENT_FAILED);
    }
  }
}
