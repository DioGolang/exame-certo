import { Patient } from '../../infra/persistence/mongodb/schemas/patient.schema';
import { QueryRepository } from './query-repository.interface';

export interface PatientQueryRepository extends QueryRepository<Patient> {}
