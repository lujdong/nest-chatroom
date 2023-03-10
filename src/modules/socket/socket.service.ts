import { ResponseCode } from 'src/enums/code';
import { SessionType } from './../../enums/type';
import { SessionList } from './../sessions/entities/session.entity';
import { SessionsService } from './../sessions/sessions.service';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageList } from './entities/message.entity';
import { UserService } from '../user/user.service';
import { ChatGroup, UserChatGroup } from './entities/socket.entity';
import { Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { ConnectedSocket, MessageBody } from '@nestjs/websockets';

@Injectable()
export class SocketService {
  constructor(
    @InjectRepository(ChatGroup)
    private readonly chatGroupRepository: Repository<ChatGroup>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserChatGroup)
    private readonly userChatGroupRepository: Repository<UserChatGroup>,
    @InjectRepository(MessageList)
    private readonly messageRepository: Repository<MessageList>,
    @InjectRepository(SessionList)
    private readonly sessionRepository: Repository<SessionList>,
    private readonly userService: UserService,
    private readonly sessionsService: SessionsService,
  ) {}

  async joinChatroom(@ConnectedSocket() socket: Socket, @MessageBody() data) {
    // 从数据库找到前端传过来的群组信息，如果用户已经再该群组，则不能再次加入
    const groupUser = await this.userChatGroupRepository.findOneBy({
      groupId: data.groupId,
      userId: data.userId,
    });
    if (groupUser) {
      return {
        code: ResponseCode.FAIL,
        message: '用户已加入该群组，请勿重复加入',
      };
    }
    const res = await this.userChatGroupRepository.save({
      userId: data.userId,
      groupId: data.groupId,
    });

    // 加入群组后创建一条群聊会话
    const session = await this.sessionRepository.save({
      userId: data.userId,
      toId: data.groupId,
      type: SessionType.GROUP,
      lastMessage: '',
    });

    //  返回用户加入的群组信息
    const group = await this.chatGroupRepository.find({
      where: {
        id: data.groupId,
      },
    });
    console.log('group: ', group);
    console.log('session: ', session);
    console.log('res: ', res);
    return {
      code: ResponseCode.SUCCESS,
      data: group,
    };
  }

  async getChatGroupUsers(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: { groupId: string },
  ) {
    // 根据前端传的群组id从数据找到这个群组关联的所有用户ID
    const group = await this.userChatGroupRepository.find({
      where: { groupId: data.groupId },
    });
    const groupUserIds = group.map((user) => user.userId);
    const users = await Promise.all(
      groupUserIds.map(async (id) => {
        return await this.userRepository.findOneBy({ id });
      }),
    );
    return users;
  }

  // 处理客户端断开连接逻辑
  async disconnectSocket(socket: Socket, userId: string) {
    // 断开连接后从群组中删除该用户
    const user = await this.userChatGroupRepository.findOneBy({ userId });
    if (user) {
      await this.userChatGroupRepository.remove(user);
    }
    return '用户已断开连接';
  }

  // 处理前端发送消息的请求
  async sendMessage(socket: Socket, data) {
    if (!data.toId && !data.fromId) {
      return '发送消息失败';
    }
    const res = await this.messageRepository.save(data);
    return res;
  }
}
