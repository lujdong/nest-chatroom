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

  async handleConnection(client: Socket): Promise<string> {
    const { userId } = client.handshake.query;
    client.join('公共聊天室');
    if (userId) {
      client.join(userId);
    }
    console.log('----------连接------------');

    // client.emit('all', { userIds: this.getChatGroupUsers() });
    // this.server.to('自由聊天室').emit('all', { a: 1 });
    return '连接成功123';
  }

  // 监听断开连接
  async handleDisconnect(client: Socket) {
    const { userId } = client.handshake.query;
    console.log('userId: ', userId);
    client.join('公共聊天室');
    if (userId) {
      client.leave(userId as string);
    }
    console.log('----------断开连接------------', userId);

    return this.socketService.disconnectSocket(client, userId as string);
  }

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

  @SubscribeMessage('message')
  async sendMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    console.log('data: ', data);
    const res = await this.socketService.sendMessage(socket, data);
    this.server.emit('message', res);
  }
}
