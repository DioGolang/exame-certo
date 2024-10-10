import { ClinicCommandRepository } from '../../../../../domain/repositories/clinic-command.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClinicDto } from '../../../../../application/clinic/dto/create-clinic.dto';
import { ClinicEntity } from '../../entities/clinic.entity';

@Injectable()
export class ClinicCommandRepositoryImpl implements ClinicCommandRepository {
  constructor(
    @InjectRepository(ClinicEntity)
    private readonly clinicRepository: Repository<ClinicEntity>,
  ) {}

  async save(clinic: CreateClinicDto): Promise<void> {
    await this.clinicRepository.save(clinic);
  }

  update(entity: CreateClinicDto): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<void> {
    await this.clinicRepository.delete(id);
  }

  async findById(id: string): Promise<ClinicEntity> {
    return await this.clinicRepository.findOne({ where: { id } });
  }
}
