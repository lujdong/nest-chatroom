import { getDateTime } from 'src/utils/datatime';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_list' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ default: 0 })
  sex: number;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true, type: 'datetime' })
  birthday: string;

  @Column({ name: 'create_time', type: 'datetime', default: getDateTime() })
  createTime: string;
}
