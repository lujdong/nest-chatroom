/**
 * 登录请求实体
 */
export interface UserLoginParams {
  username: string;
  password: string;
}

/**
 * 注册请求实体
 */
export interface UserRegisterParams extends UserLoginParams {
  rePassword: string;
}

/**
 * 用户基本信息实体
 */
export interface UserBaseInfo {
  /* 用户ID */
  id: string;
  /* 用户名（唯一） */
  username: string;
  /* 昵称 */
  nickname: string;
  /* 密码 */
  password: string;
  /**
   * 0: 保密
   * 1：男
   * 2：女
   */
  sex: number;
  /* 年龄 */
  age: number;
  /* 手机号 */
  phone: string;
  /* 生日 */
  birthday: string;
  /* 头像 */
  avatar: string;
  /* 注册时间 */
  createTime: string;
}
