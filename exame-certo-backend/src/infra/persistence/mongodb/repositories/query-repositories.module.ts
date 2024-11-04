import { Module } from '@nestjs/common';
import { ClinicQueryRepositoryModule } from './clinic-query-repository/clinic-query-repository.module';
import { PatientQueryRepositoryModule } from './patient-query-repository/patient-query-repository.module';
import { DoctorQueryRepositoryModule } from './doctor-query-repository/doctor-query-repository.module';
import { AttendantQueryRepositoryModule } from './attendant-query-repository/attendant-query-repository.module';
import { NursingQueryRepositoryModule } from './nursing-query-repository/nursing-query-repository.module';

@Module({
  imports: [
    ClinicQueryRepositoryModule,
    PatientQueryRepositoryModule,
    DoctorQueryRepositoryModule,
    AttendantQueryRepositoryModule,
    NursingQueryRepositoryModule,
  ],
})
export class QueryRepositoriesModule {}
