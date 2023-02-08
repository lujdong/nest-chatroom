import { ResponseCode } from './../../enums/code';
import { User } from './entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserBaseInfo, UserRegisterParams } from './dto/user.dto';
import { ResponseEntity } from 'src/types/response';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async userRegister(requestBody: UserRegisterParams): Promise<ResponseEntity> {
    const { data } = await this.getUserByName(requestBody.username);
    console.log('data: ', data);
    // 数据中已经存在该用户名
    if (data) {
      console.log({
        code: ResponseCode.FAIL,
        message: '用户名已存在',
        data: null,
      });

      return { code: ResponseCode.FAIL, message: '用户名已存在', data: null };
    }
    const newUser = await this.userRepository.save(requestBody);
    return {
      code: ResponseCode.SUCCESS,
      data: newUser,
      message: '注册成功',
    };
  }

  /**
   * 根据用户名查询用户
   * @param username 唯一用户名
   * @returns
   */
  async getUserByName(username: string): Promise<ResponseEntity<UserBaseInfo>> {
    try {
      if (username) {
        const user = await this.userRepository.findOneBy({
          username,
        });
        return {
          code: ResponseCode.SUCCESS,
          data: user,
          message: null,
        };
      }
      return { code: ResponseCode.FAIL, message: '请输入用户名', data: null };
    } catch (e) {
      return { code: ResponseCode.ERROR, message: '查找用户错误', data: null };
    }
  }
}
