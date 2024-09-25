import { DoctorCommandRepository } from '../../../../../domain/repositories/doctor-command.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorEntity } from '../../entities/doctor.entity';
import { CreateDoctorDto } from '../../../../../application/doctor/dto/create-doctor.dto';
import { Repository } from 'typeorm';

export class DoctorCommandRepositoryImpl implements DoctorCommandRepository {
  constructor(
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: Repository<DoctorEntity>,
  ) {}

  async save(doctor: CreateDoctorDto): Promise<void> {
    await this.doctorRepository.save(doctor);
  }

  async update(doctor) {
    throw new Error('Method not implemented.');
  }

  async delete(id: string) {
    await this.doctorRepository.delete(id);
  }

  async findById(id: string) {
    return await this.doctorRepository.findOne({ where: { id } });
  }
}
