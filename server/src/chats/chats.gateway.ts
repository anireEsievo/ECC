import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ namespace: 'chats' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  // constructor(private readonly chatsService: ChatsService) {}

  @WebSocketServer() server: Server;
  handleConnection(client: Socket) {
    client.on('sendChat', (data) => {
      client.broadcast.emit('newChats', data);
    });
  }

  handleDisconnect(client: Socket) {
    console.log(`socket disconnected: ${client.id}`);
  }
}
