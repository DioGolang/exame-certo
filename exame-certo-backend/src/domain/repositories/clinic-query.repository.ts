import { Clinic } from '../entities/clinic.entity';
import { QueryRepository } from './query-repository.interface';

export interface ClinicQueryRepository extends QueryRepository<Clinic> {}
