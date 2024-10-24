import { Column, Entity, PrimaryColumn } from 'typeorm';
import { OutboxStatus } from '../../../../application/enums/outbox-status.enum';

@Entity('outbox')
export class OutboxEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  event_type: string;

  @Column('jsonb')
  payload: any;

  @Column({ type: 'enum', enum: OutboxStatus, default: OutboxStatus.PENDING })
  status: OutboxStatus;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
