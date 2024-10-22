import { OutboxStatus } from '../../enums/outbox-status.enum';
import { IsDate, IsEnum, IsString } from 'class-validator';

export class OutboxDto {
  @IsString()
  event_type: string;

  payload: any;

  @IsEnum(OutboxStatus)
  status: OutboxStatus;

  @IsDate()
  created_at: Date;
}
