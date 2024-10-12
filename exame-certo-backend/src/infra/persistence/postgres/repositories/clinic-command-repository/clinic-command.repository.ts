import { ClinicCommandRepository } from '../../../../../domain/repositories/clinic-command.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClinicEntity } from '../../entities/clinic.entity';
import { CreateClinicEventDto } from '../../../../../application/clinic/dto/create-clinic-event.dto';

@Injectable()
export class ClinicCommandRepositoryImpl implements ClinicCommandRepository {
  constructor(
    @InjectRepository(ClinicEntity)
    private readonly clinicRepository: Repository<ClinicEntity>,
  ) {}

  async save(clinic: CreateClinicEventDto): Promise<void> {
    await this.clinicRepository.save(clinic);
  }

  update(entity: CreateClinicEventDto): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<void> {
    await this.clinicRepository.delete(id);
  }

  async findById(id: string): Promise<ClinicEntity> {
    return await this.clinicRepository.findOne({ where: { id } });
  }
}
