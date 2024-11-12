import { NursingQueryRepository } from '../../../../../domain/repositories/nursing-query.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { RegisteredNursingEventDto } from '../../../../../application/nursing/dto/registered-nursing-event.dto';
import { Nursing } from '../../schemas/nursing.schema';

export class NursingQueryRepositoryImpl implements NursingQueryRepository {
  constructor(
    @InjectModel(Nursing.name) private nursingModel: Model<Nursing>,
  ) {}

  async findById(id: string): Promise<Nursing> {
    try {
      const nursing = await this.nursingModel.findById(id).exec();
      if (!nursing) {
        throw new NotFoundException(`Nursing with id ${id} not found.`);
      }
      return nursing;
    } catch (error) {
      throw new NotFoundException(`Nursing with id ${id} not found.`);
    }
  }

  async findByEmail(email: string): Promise<Nursing | null> {
    try {
      const nursing = await this.nursingModel.findOne({ email }).exec();
      if (!nursing) {
        throw new NotFoundException(`Nursing with email ${email} not found.`);
      }
      return nursing;
    } catch (error) {
      throw new NotFoundException(`Nursing with email ${email} not found.`);
    }
  }

  async findAll(): Promise<Nursing[]> {
    try {
      const nursings = await this.nursingModel.find().exec();
      if (!nursings) {
        throw new NotFoundException('No nursings found.');
      }
      return nursings;
    } catch (error) {
      throw new NotFoundException('No nursings found.');
    }
  }

  async save(nursing: RegisteredNursingEventDto): Promise<void> {
    await new this.nursingModel(nursing).save();
  }
}
