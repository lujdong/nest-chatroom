import { ChatGroup } from './entities/socket.entity';

import { DataSource } from 'typeorm';

export const chatGroupProviders = [
  {
    provide: 'CHAT_GROUP_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ChatGroup),
    inject: ['DATA_SOURCE'],
  },
];
