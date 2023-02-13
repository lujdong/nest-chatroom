import { UserModule } from './../modules/user/user.module';
import { DatabaseModule } from './../modules/database/database.module';
import { Inject, Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import {
  chatGroupProviders,
  messageProviders,
  userChatGroupProviders,
} from './socket.providers';
import { userProviders } from 'src/modules/user/user.providers';
import { Repository } from 'typeorm';
import { ChatGroup } from './entities/socket.entity';

export const defaultGroupData = {
  id: '0',
  groupName: '公共聊天室',
  userId: 'admin',
};

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [
    ...chatGroupProviders,
    ...userProviders,
    ...userChatGroupProviders,
    ...messageProviders,
    SocketGateway,
    SocketService,
  ],
  exports: [...chatGroupProviders, ...userProviders],
})
export class SocketModule {
  constructor(
    @Inject('CHAT_GROUP_REPOSITORY')
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
