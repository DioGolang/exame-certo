import { CommandRepository } from './command-repository.interface';
import { DoctorEntity } from '../../infra/persistence/postgres/entities/doctor.entity';
import { CreateDoctorDto } from '../../application/doctor/dto/create-doctor.dto';

export interface DoctorCommandRepository
  extends CommandRepository<CreateDoctorDto, DoctorEntity> {}
