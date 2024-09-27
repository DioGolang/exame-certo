import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ClinicQueryRepository } from '../../../../../domain/repositories/clinic-query.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Clinic as ClinicModel } from '../../schemas/clinic.schema';
import { CreateClinicEventDto } from '../../../../../application/clinic/dto/create-clinic-event.dto';

@Injectable()
export class ClinicQueryRepositoryImpl implements ClinicQueryRepository {
  constructor(
    @InjectModel(ClinicModel.name) private clinicModel: Model<ClinicModel>,
  ) {}

  async save(createClinicDto: CreateClinicEventDto): Promise<void> {
    await new this.clinicModel(createClinicDto).save();
  }

  async findById(id: string): Promise<ClinicModel> {
    try {
      const clinic = await this.clinicModel.findOne({ id }).exec();
      if (!clinic) {
        throw new NotFoundException(`Clinic with ID ${id} not found.`);
      }
      return clinic;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching clinic with ID ${id}`,
      );
    }
  }

  findAll(): Promise<ClinicModel[]> {
    throw new Error('Method not implemented.');
  }
}
