import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway({ cors: true })
export class SocketGateway {
  constructor(private readonly socketService: SocketService) {
    this.defaultGroup = '公共聊天室';
  }

  @WebSocketServer()
  server: Server;

  defaultGroup: string;

  @SubscribeMessage('joinChatroom')
  async joinChatroom(@ConnectedSocket() socket: Socket, @MessageBody() data) {
    return await this.socketService.joinChatroom(socket, data);
  }

  @SubscribeMessage('roomUsers')
  async getChatGroupUsers(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: { groupId: string },
  ) {
    const allSockets = await this.server.in('公共聊天室').fetchSockets();
    console.log('===========连接数量===============', allSockets.length);
    return await this.socketService.getChatGroupUsers(socket, data);
  }
}
