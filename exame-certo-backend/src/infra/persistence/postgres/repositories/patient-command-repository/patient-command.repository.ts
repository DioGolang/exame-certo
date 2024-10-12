import { Injectable } from '@nestjs/common';
import { PatientCommandRepository } from '../../../../../domain/repositories/patient-command.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientEntity } from '../../entities/patient.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { CreatePatientEventDto } from '../../../../../application/patient/dto/create-patient-event.dto';

@Injectable()
export class PatientCommandRepositoryImpl implements PatientCommandRepository {
  constructor(
    @InjectRepository(PatientEntity)
    private readonly patientRepository: Repository<PatientEntity>,
  ) {}

  async save(patient: CreatePatientEventDto): Promise<void> {
    const patientEntity = plainToClass(PatientEntity, patient);
    await this.patientRepository.save(patientEntity);
  }

  update(entity: CreatePatientEventDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<PatientEntity> {
    throw new Error('Method not implemented.');
  }
}
