import { ClinicReadRepository } from '../../../../../domain/repositories/clinic-read.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Clinic as ClinicModel } from '../../../mongodb/schemas/clinic.schema';
import { Clinic } from '../../../../../domain/entities/clinic.entity';
import { CreateClinicDto } from '../../../../../application/dtos/create-clinic.dto';

export class ClinicReadRepositoryImpl implements ClinicReadRepository {
  constructor(
    @InjectModel(ClinicModel.name)
    private readonly clinicModel: Model<ClinicModel>,
    // private readonly clinicMapper: ClinicMapper,
  ) {}

  // async findById(id: string): Promise<Clinic | null> {
  //   const clinic = await this.clinicModel.findById(id).exec();
  //   if (!clinic) return null;
  //   return this.clinicMapper.toDomain(clinic);
  // }

  async save(entity: Clinic): Promise<void> {
    // const createdCat = new this.clinicModel(entity).save();
    await this.clinicModel.create(entity);
  }

  async create(createClinicDto: CreateClinicDto): Promise<void> {
    await new this.clinicModel(createClinicDto).save();
  }
}
