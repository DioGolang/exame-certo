import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Doctor, DoctorSchema } from '../../schemas/doctor.schema';
import { DoctorQueryRepositoryImpl } from './doctor-query.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Doctor.name, schema: DoctorSchema }]),
  ],
  providers: [
    {
      provide: 'DoctorQueryRepository',
      useClass: DoctorQueryRepositoryImpl,
    },
  ],
  exports: ['DoctorQueryRepository'],
})
export class DoctorQueryRepositoryModule {}
