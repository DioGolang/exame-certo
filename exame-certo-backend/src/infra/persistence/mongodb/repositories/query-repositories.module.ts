import { Module } from '@nestjs/common';
import { ClinicQueryRepositoryModule } from './clinic-query-repository/clinic-query-repository.module';
import { PatientQueryRepositoryModule } from './patient-query-repository/patient-query-repository.module';
import { DoctorQueryRepositoryModule } from './doctor-query-repository/doctor-query-repository.module';

@Module({
  imports: [ClinicQueryRepositoryModule, PatientQueryRepositoryModule, DoctorQueryRepositoryModule],
})
export class QueryRepositoriesModule {}
