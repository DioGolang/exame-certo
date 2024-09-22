import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorSchema } from '../../infra/persistence/mongodb/schemas/doctor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Doctor', schema: DoctorSchema }]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class DoctorModule {}
