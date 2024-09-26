import { Injectable } from '@nestjs/common';
import { PatientCommandRepository } from '../../../../../domain/repositories/patient-command.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientEntity } from '../../entities/patient.entity';
import { Repository } from 'typeorm';
import { CreatePatientDto } from 'src/application/patient/dto/create-patient.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PatientCommandRepositoryImpl implements PatientCommandRepository {
  constructor(
    @InjectRepository(PatientEntity)
    private readonly patientRepository: Repository<PatientEntity>,
  ) {}

  async save(patient: CreatePatientDto): Promise<void> {
    const patientEntity = plainToClass(PatientEntity, patient);
    await this.patientRepository.save(patientEntity);
  }

  update(entity: CreatePatientDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<PatientEntity> {
    throw new Error('Method not implemented.');
  }
}
