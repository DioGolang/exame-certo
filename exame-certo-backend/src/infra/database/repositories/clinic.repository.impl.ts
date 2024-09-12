import { Clinic } from 'src/domain/entities/clinic.entity';
import { ClinicRepository } from '../../../domain/repositories/clinic.repository';
import { Injectable } from '@nestjs/common';
import { ClinicEntity } from '../entities/clinic.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicMapper } from './mappers/clinic.mapper';

@Injectable()
export class ClinicRepositoryImpl implements ClinicRepository {
  constructor(
    @InjectRepository(ClinicEntity)
    private readonly clinicRepository: Repository<ClinicEntity>,
    private readonly clinicMapper: ClinicMapper,
  ) {}

  async save(clinic: Clinic): Promise<void> {
    await this.clinicRepository.save(clinic);
  }
  async update(clinic: Clinic): Promise<void> {
    await this.clinicRepository.save(clinic);
  }
  async delete(id: string): Promise<void> {
    await this.clinicRepository.delete(id);
  }
  async findById(id: string): Promise<Clinic | null> {
    const clinic = await this.clinicRepository.findOne({ where: { id } });
    if (!clinic) return null;
    return this.clinicMapper.toDomain(clinic);
  }
}
