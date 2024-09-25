import { CommandRepository } from './command-repository.interface';
import { CreatePatientDto } from '../../application/patient/dto/create-patient.dto';
import { PatientEntity } from '../../infra/persistence/postgres/entities/patient.entity';

export interface PatientRepository
  extends CommandRepository<CreatePatientDto, PatientEntity> {
  save(patient: CreatePatientDto): Promise<void>;
  update(patient: CreatePatientDto): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<PatientEntity | null>;
  findAll(): Promise<PatientEntity[]>;
}
