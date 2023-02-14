import { MessageTypeEnum } from 'src/enums/message';
import { getDateTime } from 'src/utils/datatime';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'message_list' })
export class MessageList {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'from_id' })
  fromId: string;

  @Column({ name: 'to_id' })
  toId: string;

  @Column()
  content: string;

  @Column({ default: 0 })
  type: MessageTypeEnum;

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
