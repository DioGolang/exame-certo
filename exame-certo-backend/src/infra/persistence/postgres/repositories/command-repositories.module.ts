import { Module } from '@nestjs/common';
import { PatientCommandRepositoryModule } from './patient-command-repository/patient-command-repository.module';
import { ClinicCommandRepositoryModule } from './clinic-command-repository/clinic-command-repository.module';

@Module({
  imports: [PatientCommandRepositoryModule, ClinicCommandRepositoryModule],
})
export class CommandRepositoriesModule {}
