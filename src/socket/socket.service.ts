import { ChatGroup } from './entities/socket.entity';
import { Socket } from 'socket.io';
import { UserBaseInfo } from './../modules/user/dto/user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { CreateSocketDto } from './dto/create-socket.dto';
import { UpdateSocketDto } from './dto/update-socket.dto';
import { Repository } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class SocketService {
  constructor(
    @Inject('CHAT_GROUP_REPOSITORY')
    private readonly chatGroupRepository: Repository<ChatGroup>,
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}

  async joinChatroom(socket: Socket, user: UserBaseInfo) {
    try {
      const data = await this.chatGroupRepository.save({
        userId: user.id,
      });
      console.log('data: ', data);
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
