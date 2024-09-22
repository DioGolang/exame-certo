import { Module } from '@nestjs/common';
import { ClinicQueryRepositoryModule } from '../../infra/persistence/mongodb/repositories/clinic-query-repository/clinic-query-repository.module';
import { ClinicCommandRepositoryModule } from '../../infra/persistence/postgres/repositories/clinic-command-repository/clinic-command-repository.module';
import { ClinicService } from './services/clinic.service';

@Module({
  imports: [ClinicQueryRepositoryModule, ClinicCommandRepositoryModule],
  providers: [ClinicService],
  exports: [ClinicService],
})
export class ClinicModule {}
