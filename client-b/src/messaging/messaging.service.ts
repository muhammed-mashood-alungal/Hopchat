import { Injectable } from '@nestjs/common';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';

@Injectable()
export class MessagingService {
  constructor(private readonly rabbitmqService: RabbitmqService) {}

  handleData(data: any) {
    console.log('Handling Data');
    console.log(data)
  }

  sendMessage(message: string) {
    this.rabbitmqService.sendMessage('test', { sender: 'Client-B', message });
  }
}
