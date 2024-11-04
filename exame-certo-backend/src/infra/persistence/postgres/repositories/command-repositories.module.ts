import { Module } from '@nestjs/common';
import { PatientCommandRepositoryModule } from './patient-command-repository/patient-command-repository.module';
import { ClinicCommandRepositoryModule } from './clinic-command-repository/clinic-command-repository.module';
import { DoctorCommandRepositoryModule } from './doctor-command-repository/doctor-command-repository.module';
import { OutboxRepositoryModule } from './outbox-repository/outbox-repository.module';
import { AttendantCommandRepositoryModule } from './attendant-command-repository/attendant-command-repository.module';
import { NursingCommandRepositoryModule } from './nursing-command-repository/nursing-command-repository.module';

@Module({
  imports: [
    PatientCommandRepositoryModule,
    ClinicCommandRepositoryModule,
    DoctorCommandRepositoryModule,
    OutboxRepositoryModule,
    AttendantCommandRepositoryModule,
    NursingCommandRepositoryModule,
  ],
})
export class CommandRepositoriesModule {}
