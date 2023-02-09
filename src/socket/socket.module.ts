import { DatabaseModule } from './../modules/database/database.module';
import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { chatGroupProviders } from './socket.providers';
import { userProviders } from 'src/modules/user/user.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...chatGroupProviders,
    ...userProviders,
    SocketGateway,
    SocketService,
  ],
  exports: [...chatGroupProviders, ...userProviders],
})
export class SocketModule {}
