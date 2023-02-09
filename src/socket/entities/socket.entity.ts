import { getDateTime } from 'src/utils/datatime';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

export class Socket {}

@Entity({ name: 'chat_group' })
export class ChatGroup {
  @PrimaryColumn({ default: 0 })
  @PrimaryGeneratedColumn('increment')
  id: number;

  // userId 在群聊中是唯一的，一个用户无法多次加入同一群聊
  @Column({ name: 'user_id', unique: true })
  userId: string;

  @Column({ name: 'group_name', default: '公共聊天室' })
  groupName: string;

  @Column({
    name: 'join_time',
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
  joinTime: string;
}
