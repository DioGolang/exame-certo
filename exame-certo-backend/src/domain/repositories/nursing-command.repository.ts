import { NursingEntity } from '../../infra/persistence/postgres/entities/nursing.entity';
import { RegisterNursingEventDto } from '../../application/nursing/dto/register-nursing-event.dto';
import { CommandRepository } from './command-repository.interface';

export interface NursingCommandRepository
  extends CommandRepository<RegisterNursingEventDto, NursingEntity> {}
