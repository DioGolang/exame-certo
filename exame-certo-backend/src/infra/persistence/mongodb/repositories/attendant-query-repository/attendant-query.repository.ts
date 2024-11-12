import { AttendantQueryRepository } from '../../../../../domain/repositories/attendant-query.repository';
import { Attendant } from '../../schemas/attendant.schema';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { RegisteredAttendantEventDto } from '../../../../../application/attendant/dto/registered-attendant-event.dto';
import { Model } from 'mongoose';

export class AttendantQueryRepositoryImpl implements AttendantQueryRepository {
  constructor(
    @InjectModel(Attendant.name) private attendantModel: Model<Attendant>,
  ) {}

  async findById(id: string): Promise<Attendant> {
    try {
      const attendant = await this.attendantModel.findById(id).exec();
      if (!attendant) {
        throw new NotFoundException(`Attendant with id ${id} not found.`);
      }
      return attendant;
    } catch (error) {
      throw new NotFoundException(`Attendant with id ${id} not found.`);
    }
  }

  async findByEmail(email: string): Promise<Attendant | null> {
    try {
      const attendant = await this.attendantModel.findOne({ email }).exec();
      if (!attendant) {
        throw new NotFoundException(`Attendant with email ${email} not found.`);
      }
      return attendant;
    } catch (error) {
      throw new NotFoundException(`Attendant with email ${email} not found.`);
    }
  }

  async findAll(): Promise<Attendant[]> {
    return await this.attendantModel.find().exec();
  }

  async save(attendant: RegisteredAttendantEventDto): Promise<void> {
    await new this.attendantModel(attendant).save();
  }
}
