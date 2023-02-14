import { DatabaseModule } from './modules/database/database.module';
import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { SocketModule } from './modules/socket/socket.module';

@Module({
  imports: [DatabaseModule, UserModule, SocketModule],
  exports: [DatabaseModule],
  providers: [DatabaseModule],
})
export class AppModule {}
