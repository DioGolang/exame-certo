import { Module } from '@nestjs/common';
import { ClinicPersistenceFactory } from './clinic-persistence.factory';
import { PatientPersistenceFactory } from './patient-persistence.factory';
import { DoctorPersistenceFactory } from './doctor-persistence.factory';

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
  ],
  exports: [
    'ClinicPersistenceFactory',
    'PatientPersistenceFactory',
    'DoctorPersistenceFactory',
  ],
})
export class PersistenceModule {}
