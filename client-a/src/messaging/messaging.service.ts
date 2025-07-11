import { Injectable } from '@nestjs/common';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';
import { SocketGateway } from 'src/socket/socket.gateway';
import { MessageDto } from './message.dto';

@Injectable()
export class MessagingService {
  constructor(
    private readonly rabbitMqService: RabbitmqService,
    private readonly socketGateway: SocketGateway,
  ) {}

  async handleData(data: unknown) {
    console.log('MESSAGE FROM CLIENT-B : ')
    console.log(data)
    this.socketGateway.emitMessageToClient(data);
  }

  async sendMessage(message: MessageDto) {
    return await this.rabbitMqService.sendMessage('message', message);
  }
}
