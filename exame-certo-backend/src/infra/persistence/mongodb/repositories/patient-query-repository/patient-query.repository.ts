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

  findByCpf(cpf: string): Promise<Patient> {
    try {
      const patient = this.patientModel
        .findOne({ 'documentation.cpf.cpf': cpf })
        .exec();
      if (!patient) {
        throw new NotFoundException(`Patient with cpf ${cpf} not found.`);
      }
      return patient;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching clinic with cpf ${cpf}`,
      );
    }
  }

  findByRg(rg: string): Promise<Patient> {
    try {
      const patient = this.patientModel
        .findOne({ 'documentation.rg.rg': rg })
        .exec();
      if (!patient) {
        throw new NotFoundException(`Patient with rg ${rg} not found.`);
      }
      return patient;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching clinic with rg ${rg}`,
      );
    }
  }

  findByCnh(cnh: string): Promise<Patient> {
    try {
      const patient = this.patientModel
        .findOne({ 'documentation.cnh.cnh': cnh })
        .exec();
      if (!patient) {
        throw new NotFoundException(`Patient with cnh ${cnh} not found.`);
      }
      return patient;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching clinic with cnh ${cnh}`,
      );
    }
  }

  findByCns(cns: string): Promise<Patient> {
    try {
      const patient = this.patientModel
        .findOne({ 'documentation.cns.cns': cns })
        .exec();
      if (!patient) {
        throw new NotFoundException(`Patient with cns ${cns} not found.`);
      }
      return patient;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching clinic with cns ${cns}`,
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
