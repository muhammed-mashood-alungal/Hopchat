import { Injectable } from '@nestjs/common';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';

@Injectable()
export class MessagingService {
  constructor(private readonly rabbitMqService: RabbitmqService) {}

  async handleData(data: any) {
    console.log('handling data');
    console.log(data);
  }

  async sendMessage(message: string) {
    return  await this.rabbitMqService.sendMessage('test', {
      sender: 'Client-A',
      message,
    });
  }
}
