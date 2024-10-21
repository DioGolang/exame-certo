import { Patient } from '../../infra/persistence/mongodb/schemas/patient.schema';
import { QueryRepository } from './query-repository.interface';

export interface PatientQueryRepository extends QueryRepository<Patient> {
  findByCpf(cpf: string): Promise<Patient>;
  findByRg(rg: string): Promise<Patient>;
  findByCns(cns: string): Promise<Patient>;
  findByCnh(cnh: string): Promise<Patient>;
}
