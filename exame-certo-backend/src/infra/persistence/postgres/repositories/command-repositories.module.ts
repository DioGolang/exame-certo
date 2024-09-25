import { Module } from '@nestjs/common';
import { PatientCommandRepositoryModule } from './patient-command-repository/patient-command-repository.module';
import { ClinicCommandRepositoryModule } from './clinic-command-repository/clinic-command-repository.module';
import { DoctorCommandRepositoryModule } from './doctor-command-repository/doctor-command-repository.module';

@Module({
  imports: [PatientCommandRepositoryModule, ClinicCommandRepositoryModule, DoctorCommandRepositoryModule],
})
export class CommandRepositoriesModule {}
