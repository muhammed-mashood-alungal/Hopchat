import { Injectable } from '@nestjs/common';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';
import { SocketGateway } from 'src/socket/socket.gateway';
import { MessageType } from './message.types';

@Injectable()
export class MessagingService {
  constructor(
    private readonly rabbitMqService: RabbitmqService,
    private readonly socketGateway: SocketGateway,
  ) {}

  async handleData(data: any) {
    this.socketGateway.emitMessageToClient(data);
  }

  async sendMessage(data : MessageType) {
    return await this.rabbitMqService.sendMessage('test', data);
  }
}
