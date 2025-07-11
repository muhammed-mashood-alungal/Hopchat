import { Injectable } from '@nestjs/common';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';
import { SocketGateway } from 'src/socket/socket.gateway';
import { MessageType } from './message.types';

@Injectable()
export class MessagingService {
  constructor(
    private readonly rabbitmqService: RabbitmqService,
    private readonly socketGateway: SocketGateway,
  ) {}

  handleData(data: any) {
    console.log('Handling Data');
    console.log(data);
    this.socketGateway.emitMessageToClient(data)
  }

  async sendMessage(data : MessageType) {
    const res= await this.rabbitmqService.sendMessage('test', data);
    console.log(res)
  }
}
