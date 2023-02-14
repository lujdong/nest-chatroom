import { DatabaseModule } from './modules/database/database.module';
import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { SocketModule } from './modules/socket/socket.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { MessageList } from './modules/socket/entities/message.entity';
// import { UserChatGroup } from './modules/socket/entities/socket.entity';
// import { User } from './modules/user/entities/user.entity';
// import { ChatGroup } from './socket copy/entities/socket.entity';
import { SessionsModule } from './modules/sessions/sessions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'chatroom',
      // entities: [User, ChatGroup, UserChatGroup, MessageList],
      autoLoadEntities: true,
      synchronize: true,
    }),
    DatabaseModule,
    UserModule,
    SocketModule,
    SessionsModule,
  ],
  exports: [DatabaseModule],
  providers: [DatabaseModule],
})
export class AppModule {}
