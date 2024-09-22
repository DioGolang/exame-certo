import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Clinic, ClinicSchema } from '../../schemas/clinic.schema';
import { ClinicQueryRepositoryImpl } from './clinic-query-repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Clinic.name, schema: ClinicSchema }]),
  ],
  providers: [
    {
      provide: 'ClinicQueryRepository',
      useClass: ClinicQueryRepositoryImpl,
    },
  ],
  exports: ['ClinicQueryRepository'],
})
export class ClinicQueryRepositoryModule {}
