import { Module } from '@nestjs/common';
import { ClinicFactory } from './clinic.factory';
import { PatientFactory } from './patient.factory';
import { DoctorFactory } from './doctor.factory';

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
export class BuildModule {}
