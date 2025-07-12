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
    origin: ['https://hopchat-sigma.vercel.app'],
    credentials: true,
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private clientId: string | null = null;
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('Server_2 - WebSocket server initialized');
    console.log('Server_2 - CORS origin:', process.env.CLIENT_URL || '*');
  }

  handleConnection(client: Socket) {
    console.log(`Server_2 - Client connected: ${client.id}, from: ${client.handshake.address}`);
    this.clientId = client.id;
  }

  handleDisconnect(client : Socket) {
    console.log(`Server_2 - Client disconnected: ${client.id}`);
    this.clientId = null;
  }

  emitMessageToClient(data: any) {
    console.log('Server_2 - Emitting message to clients:', data);
    if (this.clientId) {

      this.server.to(this.clientId).emit('message', data);
    } else {
      console.log('NO Client')
      throw new HttpException(
        errorMessages.NO_CLIENT_CONNECTED,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
