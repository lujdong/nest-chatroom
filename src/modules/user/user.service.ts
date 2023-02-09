import { ResponseCode } from './../../enums/code';
import { User } from './entities/user.entity';
import { Body, Inject, Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  UserBaseInfo,
  UserRegisterParams,
  UserLoginParams,
} from './dto/user.dto';
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
    // 数据中已经存在该用户名
    if (data) {
      return {
        code: ResponseCode.FAIL,
        message: '用户名已存在',
        data: null,
      };
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

  /**
   * 用户登录
   */
  async userLogin(
    @Body() body: UserLoginParams,
  ): Promise<ResponseEntity<UserBaseInfo>> {
    const { username, password } = body;
    const user = await this.userRepository.findOneBy({
      username,
      password,
    });
    if (!user) {
      return {
        code: -1,
        message: '用户名或密码错误',
      };
    }

    return {
      code: 0,
      data: user,
      message: '登录成功',
    };
  }

  /**
   * 根据用户ID查询
   */
  async getUserById(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      return {
        code: -1,
        message: '用户不存在',
      };
    }

    return {
      code: 0,
      data: user,
      message: '查询成功',
    };
  }
}
