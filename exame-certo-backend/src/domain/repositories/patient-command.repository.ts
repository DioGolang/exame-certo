import { CommandRepository } from './command-repository.interface';
import { CreatePatientDto } from '../../application/patient/dto/create-patient.dto';
import { PatientEntity } from '../../infra/persistence/postgres/entities/patient.entity';

export interface PatientCommandRepository
  extends CommandRepository<CreatePatientDto, PatientEntity> {}
