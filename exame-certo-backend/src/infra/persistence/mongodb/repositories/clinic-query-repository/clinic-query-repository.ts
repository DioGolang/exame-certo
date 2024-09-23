import { Injectable } from '@nestjs/common';
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
    // const createdCat = new this.clinicModel(entity).save();
    await new this.clinicModel(createClinicDto).save();
  }

  async findById(id: string): Promise<ClinicModel> {
    return await this.clinicModel.findById(id).exec();
  }
}
