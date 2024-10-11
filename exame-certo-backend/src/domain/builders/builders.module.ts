import { Module } from '@nestjs/common';
import { DoctorFactory } from './doctor.factory';
import { PatientFactory } from './patient.factory';
import { ClinicFactory } from './clinic.factory';

@Module({
  providers: [
    {
      provide: 'ClinicBuilderFactory',
      useClass: ClinicFactory,
    },
    {
      provide: 'PatientBuilderFactory',
      useClass: PatientFactory,
    },
    {
      provide: 'DoctorBuilderFactory',
      useClass: DoctorFactory,
    },
  ],
  exports: [
    'ClinicBuilderFactory',
    'PatientBuilderFactory',
    'DoctorBuilderFactory',
  ],
})
export class BuildersModule {}
