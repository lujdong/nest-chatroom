import { UserBaseInfo } from './../modules/user/dto/user.dto';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService } from './socket.service';
import { CreateSocketDto } from './dto/create-socket.dto';
import { UpdateSocketDto } from './dto/update-socket.dto';

@WebSocketGateway({ cors: true })
export class SocketGateway {
  constructor(private readonly socketService: SocketService) {}

  @SubscribeMessage('joinChatroom')
  joinChatroom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() user: UserBaseInfo,
  ) {
    return this.socketService.joinChatroom(socket, user);
  }
}
