import { Module } from '@nestjs/common';
import { BuildersModule } from './builders/builders.module';
import { ClinicDomainServiceModule } from './services/clinic/clinic-domain-service.module';
import { DoctorDomainServiceModule } from './services/doctor/doctor-domain-service.module';
import { PatientDomainServiceModule } from './services/patient/patient-domain-service.module';

@Module({
  imports: [
    BuildersModule,
    ClinicDomainServiceModule,
    DoctorDomainServiceModule,
    PatientDomainServiceModule,
  ],
})
export class DomainModule {}
