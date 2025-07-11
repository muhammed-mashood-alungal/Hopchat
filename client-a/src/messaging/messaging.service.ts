import { Injectable } from '@nestjs/common';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';
import { SocketGateway } from 'src/socket/socket.gateway';

@Injectable()
export class MessagingService {
  constructor(
    private readonly rabbitMqService: RabbitmqService,
    private readonly socketGateway: SocketGateway,
  ) {}

  async handleData(data: any) {
    console.log('handling data');
    console.log(data);
    this.socketGateway.emitMessageToClient(data);
  }

  async sendMessage(text: string) {
    return await this.rabbitMqService.sendMessage('test', {
      sender: 'Client-A',
      text,
    });
  }
}
