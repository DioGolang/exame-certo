import { Module } from '@nestjs/common';
import { ClinicDomainServiceModule } from './services/clinic/clinic-domain-service.module';
import { DoctorDomainServiceModule } from './services/doctor/doctor-domain-service.module';
import { PatientDomainServiceModule } from './services/patient/patient-domain-service.module';
import { BuildModule } from './factories/build/build.module';
import { PersistenceModule } from './factories/persistence/persistence.module';
import { AttendantDomainModule } from './services/attendant/attendant-domain.module';
import { NursingDomainModule } from './services/nursing/nursing-domain.module';

@Module({
  imports: [
    ClinicDomainServiceModule,
    DoctorDomainServiceModule,
    PatientDomainServiceModule,
    AttendantDomainModule,
    NursingDomainModule,
    BuildModule,
    PersistenceModule,
  ],
})
export class DomainModule {}
