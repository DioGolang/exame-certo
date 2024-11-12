import { InjectModel } from '@nestjs/mongoose';
import { Doctor } from '../../schemas/doctor.schema';
import { Model } from 'mongoose';
import { DoctorQueryRepository } from '../../../../../domain/repositories/doctor-query.repository';
import { CreateDoctorEventDto } from '../../../../../application/doctor/dto/create-doctor-event.dto';
import { NotFoundException } from '@nestjs/common';

export class DoctorQueryRepositoryImpl implements DoctorQueryRepository {
  constructor(@InjectModel(Doctor.name) private doctorModel: Model<Doctor>) {}

  findById(id: string): Promise<Doctor> {
    throw new Error('Method not implemented.');
  }

  findByEmail(email: string): Promise<any> {
    try {
      const doctor = this.doctorModel.findOne({ email }).exec();
      if (!doctor) {
        throw new NotFoundException(`Doctor with email ${email} not found.`);
      }
      return doctor;
    } catch (error) {
      throw new NotFoundException(`Doctor with email ${email} not found.`);
    }
  }

  async findByRegistrationNumber(
    registrationNumber: string,
  ): Promise<Doctor | null> {
    try {
      const doctor = this.doctorModel.findOne({ registrationNumber }).exec();
      if (!doctor) {
        throw new NotFoundException(
          `Doctor with registration number ${registrationNumber} not found.`,
        );
      }
      return doctor;
    } catch (error) {
      throw new NotFoundException(
        `Doctor with registration number ${registrationNumber} not found.`,
      );
    }
  }

  findAll(): Promise<Doctor[]> {
    throw new Error('Method not implemented.');
  }

  async save(doctor: CreateDoctorEventDto): Promise<void> {
    console.log('doctor, MONGO', doctor);
    await new this.doctorModel(doctor).save();
  }
}
