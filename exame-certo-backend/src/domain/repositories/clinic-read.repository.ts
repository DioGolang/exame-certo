import { ReadRepository } from '../interfaces/read-repository.interface';
import { Clinic } from '../entities/clinic.entity';

export interface ClinicReadRepository extends ReadRepository<Clinic> {}
