import { Module } from '@nestjs/common';
import { PatientCommandRepositoryModule } from './patient-command-repository/patient-command-repository.module';
import { ClinicCommandRepositoryModule } from './clinic-command-repository/clinic-command-repository.module';
import { DoctorCommandRepositoryModule } from './doctor-command-repository/doctor-command-repository.module';
import { OutboxRepositoryModule } from './outbox-repository/outbox-repository.module';

@Module({
  imports: [
    PatientCommandRepositoryModule,
    ClinicCommandRepositoryModule,
    DoctorCommandRepositoryModule,
    OutboxRepositoryModule,
  ],
})
export class CommandRepositoriesModule {}
