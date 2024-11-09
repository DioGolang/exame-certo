import { AttendantEntity } from '../../infra/persistence/postgres/entities/attendant.entity';
import { CommandRepository } from './command-repository.interface';
import { RegisterAttendantEventDto } from '../../application/attendant/dto/register-attendant-event.dto';

export interface AttendantCommandRepository
  extends CommandRepository<RegisterAttendantEventDto, AttendantEntity> {}
