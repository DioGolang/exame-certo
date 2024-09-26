import { InjectModel } from '@nestjs/mongoose';
import { Patient } from '../../schemas/patient.schema';
import { Model } from 'mongoose';
import { PatientQueryRepository } from '../../../../../domain/repositories/patient-query.repository';

export class PatientQueryRepositoryImpl implements PatientQueryRepository {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
  ) {}

  async findById(id: string): Promise<Patient> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Patient[]> {
    throw new Error('Method not implemented.');
  }

  async save(patient: Patient): Promise<void> {
    await new this.patientModel(patient).save();
  }
}
