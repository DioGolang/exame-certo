import { Module } from '@nestjs/common';
import { ClinicPersistenceFactory } from './clinic-persistence.factory';

@Module({
  providers: [
    {
      provide: 'ClinicPersistenceFactory',
      useClass: ClinicPersistenceFactory,
    },
    {
      provide: 'PatientPersistenceFactory',
      useClass: ClinicPersistenceFactory,
    },
    {
      provide: 'DoctorPersistenceFactory',
      useClass: ClinicPersistenceFactory,
    },
  ],
  exports: [
    'ClinicPersistenceFactory',
    'PatientPersistenceFactory',
    'DoctorPersistenceFactory',
  ],
})
export class PersistenceModule {}
