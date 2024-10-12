import { CommandRepository } from './command-repository.interface';
import { ClinicEntity } from '../../infra/persistence/postgres/entities/clinic.entity';
import { CreateClinicEventDto } from '../../application/clinic/dto/create-clinic-event.dto';

export interface ClinicCommandRepository
  extends CommandRepository<CreateClinicEventDto, ClinicEntity> {}
