import { ClinicReadRepository } from '../../../../../domain/repositories/clinic-read.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Clinic } from '../../../mongodb/schemas/clinic.schema';
import { Clinic as ClinicEntity } from '../../../../../domain/entities/clinic.entity';
import { CreateClinicDto } from '../../../../../application/dtos/create-clinic.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClinicReadRepositoryImpl implements ClinicReadRepository {
  constructor(
    @InjectModel(Clinic.name)
    private readonly clinicModel: Model<Clinic>,
    // private readonly clinicMapper: ClinicMapper,
  ) {}

  // async findById(id: string): Promise<Clinic | null> {
  //   const clinic = await this.clinicModel.findById(id).exec();
  //   if (!clinic) return null;
  //   return this.clinicMapper.toDomain(clinic);
  // }

  async save(entity: ClinicEntity): Promise<void> {
    // const createdCat = new this.clinicModel(entity).save();
    await this.clinicModel.create(entity);
  }

  async create(createClinicDto: CreateClinicDto): Promise<void> {
    await new this.clinicModel(createClinicDto).save();
  }
}
