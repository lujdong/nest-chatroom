import { MessageList } from '.././socket/entities/message.entity';
import { ResponseEntity } from 'src/types/response';
import { User } from 'src/modules/user/entities/user.entity';
import { SessionList } from './entities/session.entity';
import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { ResponseCode } from 'src/enums/code';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(SessionList)
    private readonly sessionRepository: Repository<SessionList>,
    @InjectRepository(MessageList)
    private readonly messageRepository: Repository<MessageList>,
  ) {}

  /**
   * 新增一条会话窗口
   * @param createSessionDto
   * @returns
   */
  async createSession(createSessionDto: SessionList) {
    const res = await this.sessionRepository.save(createSessionDto);
    console.log('res: ', res);
    return res;
  }

  /**
   * 获取用户会话列表
   * @param userId
   * @returns
   */
  async getSessionList(userId: string) {
    // try {
    //   const res = await this.sessionRepository
    //     .createQueryBuilder('session')
    //     .leftJoinAndSelect(User, 'user', 'user.id = session.userId')
    //     .select(
    //       `
    //     session.id as sessionId,
    //       session.to_id as toId,
    //       session.type as sessionType,
    //       session.last_message as lastMessage,
    //       session.read as unRead,
    //       DATE_FORMAT(session.update_time,"%Y-%m-%d %H:%m:%s") as updateTime,
    //       DATE_FORMAT(session.create_time,"%Y-%m-%d %H:%m:%s") as createTime,
    //       user.id as userId,
    //       user.avatar as cover,
    //       user.username as username,
    //       user.nickname as nickname
    //   `,
    //     )
    //     .getRawMany();
    //   return {
    //     code: ResponseCode.SUCCESS,
    //     message: '查询会话列表成功',
    //     data: res,
    //   };
    // } catch (error) {
    //   console.log(error);
    //   return {
    //     code: ResponseCode.ERROR,
    //     message: '服务器错误',
    //   };
    // }
    const data = await this.sessionRepository.find({ where: { userId } });
    return {
      data,
      code: ResponseCode.SUCCESS,
      message: '查询会话列表成功',
    };
  }

  async getMessageList(
    sessionId: string,
  ): Promise<ResponseEntity<MessageList[]>> {
    try {
      const data = await this.messageRepository.find({
        where: { toId: sessionId },
      });
      return {
        data,
        code: ResponseCode.SUCCESS,
        message: '获取历史消息成功',
      };
    } catch (e) {
      return {
        code: ResponseCode.ERROR,
        message: '服务器错误',
      };
    }
  }
}
