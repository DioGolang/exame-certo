import { Repository } from '../interfaces/repository.interface';
import { Clinic } from '../entities/clinic.entity';

export interface ClinicRepository extends Repository<Clinic> {
  save(clinic: Clinic): Promise<void>;
  update(clinic: Clinic): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Clinic | null>;
}
