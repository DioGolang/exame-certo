import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientSchema } from '../../infra/persistence/mongodb/schemas/patient.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Patient', schema: PatientSchema }]),
  ],
  providers: [],
  exports: [],
})
export class PatientModule {}
