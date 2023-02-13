import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.providers';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { chatGroupMapProviders } from 'src/socket copy/socket.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders, ...chatGroupMapProviders, UserService],
  exports: [...userProviders, ...chatGroupMapProviders, UserService],
})
export class UserModule {}
