import { ChatGroup } from './../../socket/entities/socket.entity';
import { DataSource } from 'typeorm';
import { User } from '../user/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'chatroom',
        entities: [User, ChatGroup],
        synchronize: true,
      });

      return await dataSource.initialize();
    },
  },
];
