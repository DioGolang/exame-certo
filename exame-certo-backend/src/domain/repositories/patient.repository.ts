import { Patient } from '../entities/patient.entity';
import { Repository } from '../interfaces/repository.interface';

export interface PatientRepository extends Repository<Patient> {
  save(patient: Patient): Promise<void>;
  update(patient: Patient): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Patient | null>;
  findAll(): Promise<Patient[]>;
}
