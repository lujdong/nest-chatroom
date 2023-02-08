import { DatabaseModule } from './modules/database/database.module';
import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  exports: [DatabaseModule],
  providers: [DatabaseModule],
})
export class AppModule {}
