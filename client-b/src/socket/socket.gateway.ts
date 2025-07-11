import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private clientId: string | null = null;
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Client Connected : ' + client.id);
    this.clientId = client.id;
  }

  handleDisconnect() {
    this.clientId = null;
  }

  emitMessageToClient(data: any) {
    if (this.clientId) {
      this.server.to(this.clientId).emit('message', data);
    } else {
      console.log('No client connected.!!!');
    }
  }
}
