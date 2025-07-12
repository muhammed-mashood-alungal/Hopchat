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
  path: '/client-b/socket.io',
  cors: {
    origin: [process.env.CLIENT_URL],
    credentials: true,
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private clientId: string | null = null;
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('Server_2 - WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    console.log('Client Connected : ' + client.id);
    this.clientId = client.id;
  }

  handleDisconnect(client: Socket) {
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
