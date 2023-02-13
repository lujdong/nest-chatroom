import { MessageList } from './entities/message.entity';
import { ChatGroup, UserChatGroup } from './entities/socket.entity';

import { DataSource } from 'typeorm';

export const chatGroupProviders = [
  {
    provide: 'CHAT_GROUP_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ChatGroup),
    inject: ['DATA_SOURCE'],
  },
];

export const userChatGroupProviders = [
  {
    provide: 'USER_CHAT_GROUP_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserChatGroup),
    inject: ['DATA_SOURCE'],
  },
];

export const messageProviders = [
  {
    provide: 'MESSAGE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MessageList),
    inject: ['DATA_SOURCE'],
  },
];
