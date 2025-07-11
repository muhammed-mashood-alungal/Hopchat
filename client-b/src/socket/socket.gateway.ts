import { HttpException, HttpStatus } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { errorMessages } from 'src/common/constants/error-messages.constants';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private clientId: string | null = null;
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    this.clientId = client.id;
  }

  handleDisconnect() {
    this.clientId = null;
  }

  emitMessageToClient(data: any) {
    if (this.clientId) {
      this.server.to(this.clientId).emit('message', data);
    } else {
      throw new HttpException(
        errorMessages.NO_CLIENT_CONNECTED,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
