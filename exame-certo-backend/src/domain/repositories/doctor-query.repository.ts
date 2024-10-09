import { Doctor } from '../../infra/persistence/mongodb/schemas/doctor.schema';
import { QueryRepository } from './query-repository.interface';

export interface DoctorQueryRepository extends QueryRepository<any> {
  findByRegistrationNumber(registrationNumber: string): Promise<Doctor | null>;
}
