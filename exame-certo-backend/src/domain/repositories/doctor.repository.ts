import { CommandRepository } from './repository.interface';
import { CreateDoctorDto } from '../../application/dtos/create-doctor.dto';
import { DoctorEntity } from '../../infra/persistence/postgres/entities/doctor.entity';

export interface DoctorRepository
  extends CommandRepository<CreateDoctorDto, DoctorEntity> {
  save(doctor: DoctorEntity): Promise<void>;
  update(doctor: DoctorEntity): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<DoctorEntity | null>;
  findAll(): Promise<DoctorEntity[]>;
}
