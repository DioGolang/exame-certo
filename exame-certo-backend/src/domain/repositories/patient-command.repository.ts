import { CommandRepository } from './command-repository.interface';
import { RegisterPatientDto } from '../../application/patient/dto/register-patient.dto';
import { PatientEntity } from '../../infra/persistence/postgres/entities/patient.entity';
import { RegisteredPatientEventDto } from '../../application/patient/dto/registered-patient-event.dto';

export interface PatientCommandRepository
  extends CommandRepository<RegisteredPatientEventDto, PatientEntity> {}
