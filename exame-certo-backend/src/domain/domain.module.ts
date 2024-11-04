import { Module } from '@nestjs/common';
import { ClinicDomainServiceModule } from './services/clinic/clinic-domain-service.module';
import { DoctorDomainServiceModule } from './services/doctor/doctor-domain-service.module';
import { PatientDomainServiceModule } from './services/patient/patient-domain-service.module';
import { BuildModule } from './factories/build/build.module';
import { PersistenceModule } from './factories/persistence/persistence.module';
import { AttendantModule } from './services/attendant/attendant.module';

@Module({
  imports: [
    ClinicDomainServiceModule,
    DoctorDomainServiceModule,
    PatientDomainServiceModule,
    BuildModule,
    PersistenceModule,
    AttendantModule,
  ],
})
export class DomainModule {}
