import { InjectModel } from '@nestjs/mongoose';
import { Doctor } from '../../schemas/doctor.schema';
import { Model } from 'mongoose';
import { DoctorQueryRepository } from '../../../../../domain/repositories/doctor-query.repository';
import { CreateDoctorEventDto } from '../../../../../application/doctor/dto/create-doctor-event.dto';

export class DoctorQueryRepositoryImpl implements DoctorQueryRepository {
  constructor(@InjectModel(Doctor.name) private doctorModel: Model<Doctor>) {}

  findByRegistrationNumber(registrationNumber: string): Promise<Doctor | null> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Doctor> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Doctor[]> {
    throw new Error('Method not implemented.');
  }

  async save(doctor: CreateDoctorEventDto): Promise<void> {
    await new this.doctorModel(doctor).save();
  }
}
