import { InjectModel } from '@nestjs/mongoose';
import { Patient } from '../../schemas/patient.schema';
import { Model } from 'mongoose';
import { PatientQueryRepository } from '../../../../../domain/repositories/patient-query.repository';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export class PatientQueryRepositoryImpl implements PatientQueryRepository {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
  ) {}

  async findById(id: string): Promise<Patient> {
    throw new Error('Method not implemented.');
  }

  findByEmail(email: string): Promise<Patient> {
    try {
      const patient = this.patientModel.findOne({ email }).exec();
      if (!patient) {
        throw new NotFoundException(`Patient with email ${email} not found.`);
      }
      return patient;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching clinic with email ${email}`,
      );
    }
  }

  async findAll(): Promise<Patient[]> {
    throw new Error('Method not implemented.');
  }

  async save(patient: Patient): Promise<void> {
    await new this.patientModel(patient).save();
  }
}
