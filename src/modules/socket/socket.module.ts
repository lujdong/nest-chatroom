import { MessageList } from './entities/message.entity';
import { UserChatGroup } from './entities/socket.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { TypeOrmModule, InjectRepository } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';

import { Repository } from 'typeorm';
import { ChatGroup } from './entities/socket.entity';

export const defaultGroupData = {
  id: '0',
  groupName: '公共聊天室',
  userId: 'admin',
};

@Module({
  imports: [
    TypeOrmModule.forFeature([User, ChatGroup, UserChatGroup, MessageList]),
    UserModule,
  ],
  providers: [SocketGateway, SocketService],
})
export class SocketModule {
  constructor(
    @InjectRepository(ChatGroup)
    private readonly chatGroupRepository: Repository<ChatGroup>,
  ) {}
  async onModuleInit() {
    const defaultGroup = await this.chatGroupRepository.findOneBy({
      id: '0',
      groupName: '公共聊天室',
    });
    if (!defaultGroup) {
      await this.chatGroupRepository.save(defaultGroupData);
      console.log('创建 公共聊天室');
    }
  }
}
