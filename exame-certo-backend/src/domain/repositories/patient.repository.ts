import { CommandRepository } from './command-repository.interface';
import { RegisterPatientDto } from '../../application/patient/dto/register-patient.dto';
import { PatientEntity } from '../../infra/persistence/postgres/entities/patient.entity';

export interface PatientRepository
  extends CommandRepository<RegisterPatientDto, PatientEntity> {
  save(patient: RegisterPatientDto): Promise<void>;
  update(patient: RegisterPatientDto): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<PatientEntity | null>;
  findAll(): Promise<PatientEntity[]>;
}
