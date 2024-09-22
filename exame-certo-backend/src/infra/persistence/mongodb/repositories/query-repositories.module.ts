import { Module } from '@nestjs/common';
import { ClinicQueryRepositoryModule } from './clinic-query-repository/clinic-query-repository.module';
import { PatientQueryRepositoryModule } from './patient-query-repository/patient-query-repository.module';

@Module({
  imports: [ClinicQueryRepositoryModule, PatientQueryRepositoryModule],
})
export class QueryRepositoriesModule {}
