import { Injectable } from '@nestjs/common';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';
import { SocketGateway } from 'src/socket/socket.gateway';

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

  sendMessage(text: string) {
    this.rabbitmqService.sendMessage('test', { sender: 'Client-B', text });
  }
}
