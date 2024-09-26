import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from '../../schemas/patient.schema';
import { PatientQueryRepositoryImpl } from './patient-query.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }]),
  ],
  providers: [
    {
      provide: 'PatientQueryRepository',
      useClass: PatientQueryRepositoryImpl,
    },
  ],
  exports: ['PatientQueryRepository'],
})
export class PatientQueryRepositoryModule {}
