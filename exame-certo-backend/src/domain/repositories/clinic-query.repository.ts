import { QueryRepository } from './query-repository.interface';
import { Clinic } from '../../infra/persistence/mongodb/schemas/clinic.schema';

export interface ClinicQueryRepository extends QueryRepository<Clinic> {}
