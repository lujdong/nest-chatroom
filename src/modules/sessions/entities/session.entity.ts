import { SessionType } from './../../../enums/type';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { getDateTime } from 'src/utils/datatime';

@Entity({ name: 'session_list' })
export class SessionList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'to_id' })
  toId: string;

  @Column()
  type: SessionType;

  @Column({ name: 'last_message' })
  lastMessage: string;

  @Column({ default: 0 })
  read: number;

  @Column({
    name: 'update_time',
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
  updateTime: string;

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
