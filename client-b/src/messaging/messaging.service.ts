import { Injectable } from '@nestjs/common';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';
import { SocketGateway } from 'src/socket/socket.gateway';
import { MessageDto } from './message.dto';

@Injectable()
export class MessagingService {
  constructor(
    private readonly rabbitmqService: RabbitmqService,
    private readonly socketGateway: SocketGateway,
  ) {}

  handleData(data: unknown) {
    console.log('MESSAGE FROM CLIENT-A : ')
    console.log(data);
    this.socketGateway.emitMessageToClient(data);
  }

  async sendMessage(message: MessageDto) {
    return await this.rabbitmqService.sendMessage('message', message);
  }
}
