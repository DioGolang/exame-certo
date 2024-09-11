import { Doctor } from '../entities/doctor.entity';
import { Repository } from '../interfaces/repository.interface';

export interface DoctorRepository extends Repository<Doctor> {
  save(doctor: Doctor): Promise<void>;
  update(doctor: Doctor): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Doctor | null>;
  findAll(): Promise<Doctor[]>;
}
