import { Module } from '@nestjs/common';
import { ClinicPersistenceFactory } from './clinic-persistence.factory';
import { PatientPersistenceFactory } from './patient-persistence.factory';
import { DoctorPersistenceFactory } from './doctor-persistence.factory';
import { NursingPersistenceFactory } from './nursing-persistence.factory';
import { AttendantPersistenceFactory } from './attendant-persistence.factory';

@Module({
  providers: [
    {
      provide: 'ClinicPersistenceFactory',
      useClass: ClinicPersistenceFactory,
    },
    {
      provide: 'PatientPersistenceFactory',
      useClass: PatientPersistenceFactory,
    },
    {
      provide: 'DoctorPersistenceFactory',
      useClass: DoctorPersistenceFactory,
    },
    {
      provide: 'NursingPersistenceFactory',
      useClass: NursingPersistenceFactory,
    },
    {
      provide: 'AttendantPersistenceFactory',
      useClass: AttendantPersistenceFactory,
    },
  ],
  exports: [
    'ClinicPersistenceFactory',
    'PatientPersistenceFactory',
    'DoctorPersistenceFactory',
    'NursingPersistenceFactory',
    'AttendantPersistenceFactory',
  ],
})
export class PersistenceModule {}
