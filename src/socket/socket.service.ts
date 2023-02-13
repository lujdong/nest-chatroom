import { UserService } from './../modules/user/user.service';
import { ChatGroup, UserChatGroup } from './entities/socket.entity';
import { Socket } from 'socket.io';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { ConnectedSocket, MessageBody } from '@nestjs/websockets';

@Injectable()
export class SocketService {
  constructor(
    @Inject('CHAT_GROUP_REPOSITORY')
    private readonly chatGroupRepository: Repository<ChatGroup>,
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    @Inject('USER_CHAT_GROUP_REPOSITORY')
    private readonly userChatGroupRepository: Repository<UserChatGroup>,
    private readonly userService: UserService,
  ) {}

  async joinChatroom(@ConnectedSocket() socket: Socket, @MessageBody() data) {
    // 从数据库找到前端传过来的群组信息，如果用户已经再该群组，则不能再次加入
    const groupUser = await this.userChatGroupRepository.findOneBy({
      groupId: data.groupId,
      userId: data.userId,
    });
    if (groupUser) {
      return '用户已加入该群组，请勿重复加入';
    }
    const res = await this.userChatGroupRepository.save({
      userId: data.userId,
      groupId: data.groupId,
    });
    console.log('res: ', res);
    return res;
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
}
