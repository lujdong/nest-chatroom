import { SessionList } from './entities/session.entity';
import { Controller, Post, Body } from '@nestjs/common';
import { SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post('create')
  create(@Body() createSessionDto: SessionList) {
    return this.sessionsService.createSession(createSessionDto);
  }

  @Post('list')
  findAll(@Body('userId') userId: string) {
    return this.sessionsService.getSessionList(userId);
  }

  @Post('messageList')
  getMessageList(@Body('sessionId') sessionId: string) {
    return this.sessionsService.getMessageList(sessionId);
  }
}
