import { getDateTime } from 'src/utils/datatime';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity({ name: 'user_list' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ select: false })
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

  @Column({
    name: 'create_time',
    type: 'datetime',
    default: getDateTime(),
    transformer: {
      to(value) {
        return getDateTime(value);
      },
      from(value) {
        return getDateTime(value);
      },
    },
  })
  createTime: string;
}
