import { NursingEntity } from '../../infra/persistence/postgres/entities/nursing.entity';
import { RegisteredNursingEventDto } from '../../application/nursing/dto/registered-nursing-event.dto';
import { CommandRepository } from './command-repository.interface';

export interface NursingCommandRepository
  extends CommandRepository<RegisteredNursingEventDto, NursingEntity> {}
