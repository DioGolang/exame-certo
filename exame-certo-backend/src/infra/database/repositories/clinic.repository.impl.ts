// import { ClinicRepository } from '../../../domain/repositories/clinic.repository';
// import { Clinic } from '../../../domain/entities/clinic.entity';
//
// export class ClinicRepositoryImpl implements ClinicRepository {
//   constructor(private readonly clinicModel: ClinicModel) {}
//
//   async save(clinic: Clinic): Promise<void> {
//     const clinicDocument = new this.clinicModel(clinic);
//     await clinicDocument.save();
//   }
//
//   async update(clinic: Clinic): Promise<void> {
//     await this.clinicModel.updateOne({ _id: clinic.id }, clinic);
//   }
//
//   async delete(id: string): Promise<void> {
//     await this.clinicModel.deleteOne({ _id: id });
//   }
//
//   async findById(id: string): Promise<Clinic | null> {
//     return this.clinicModel.findById(id);
//   }
