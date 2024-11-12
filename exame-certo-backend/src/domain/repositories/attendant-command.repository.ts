import { AttendantEntity } from '../../infra/persistence/postgres/entities/attendant.entity';
import { CommandRepository } from './command-repository.interface';
import { RegisteredAttendantEventDto } from '../../application/attendant/dto/registered-attendant-event.dto';

export interface AttendantCommandRepository
  extends CommandRepository<RegisteredAttendantEventDto, AttendantEntity> {}
