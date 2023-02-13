import { User } from 'src/modules/user/entities/user.entity';
import { getDateTime } from 'src/utils/datatime';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from 'typeorm';

export class Socket {}

@Entity({ name: 'chat_group' })
export class ChatGroup extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'admin' })
  userId: string;

  @Column({ name: 'group_name', default: '公共聊天室' })
  groupName: string;

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

@Entity({ name: 'user_chat_group' })
export class UserChatGroup extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: ' user_id' })
  userId: string;

  @Column({ name: 'chat_group_id' })
  groupId: string;
}
