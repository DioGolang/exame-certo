import { Module } from '@nestjs/common';
import { ClinicFactory } from './clinic.factory';
import { PatientFactory } from './patient.factory';
import { DoctorFactory } from './doctor.factory';
import { NursingFactory } from './nursing.factory';
import { AttendantFactory } from './attendant.factory';

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
    {
      provide: 'NursingBuilderFactory',
      useClass: NursingFactory,
    },
    {
      provide: 'AttendantBuilderFactory',
      useClass: AttendantFactory,
    },
  ],
  exports: [
    'ClinicBuilderFactory',
    'PatientBuilderFactory',
    'DoctorBuilderFactory',
    'NursingBuilderFactory',
    'AttendantBuilderFactory',
  ],
})
export class BuildModule {}
