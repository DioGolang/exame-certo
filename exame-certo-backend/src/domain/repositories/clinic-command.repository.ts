import { CommandRepository } from './command-repository.interface';
import { CreateClinicDto } from '../../application/clinic/dto/create-clinic.dto';
import { ClinicEntity } from '../../infra/persistence/postgres/entities/clinic.entity';

export interface ClinicCommandRepository
  extends CommandRepository<CreateClinicDto, ClinicEntity> {}
