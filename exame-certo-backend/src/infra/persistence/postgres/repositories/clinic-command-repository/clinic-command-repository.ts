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

  save(entity: CreateClinicDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(entity: CreateClinicDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<ClinicEntity> {
    throw new Error('Method not implemented.');
  }
}
