import { CommandRepository } from './command-repository.interface';
import { DoctorEntity } from '../../infra/persistence/postgres/entities/doctor.entity';
import { CreateDoctorDto } from '../../application/doctor/dto/create-doctor.dto';
import { CreateDoctorEventDto } from '../../application/doctor/dto/create-doctor-event.dto';

export interface DoctorCommandRepository
  extends CommandRepository<CreateDoctorEventDto, DoctorEntity> {}
