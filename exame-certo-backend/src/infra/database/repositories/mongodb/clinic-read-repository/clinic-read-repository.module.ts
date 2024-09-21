import { Module } from '@nestjs/common';
import { ClinicReadRepositoryImpl } from './clinic-read.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Clinic, ClinicSchema } from '../../../mongodb/schemas/clinic.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Clinic.name, schema: ClinicSchema }],
      'exame_certo',
    ),
  ],
  providers: [
    ClinicReadRepositoryImpl,
    {
      provide: 'ClinicReadRepository',
      useClass: ClinicReadRepositoryImpl,
    },
  ],
  exports: ['ClinicReadRepository'],
})
export class ClinicReadRepositoryModule {}
