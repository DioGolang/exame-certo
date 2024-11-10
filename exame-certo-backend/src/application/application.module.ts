import { Module } from '@nestjs/common';
import { PasswordModule } from './shared/services/password/password.module';
import { SharedModule } from './shared/shared.module';
import { AttendantModule } from './attendant/attendant.module';
import { NursingModule } from './nursing/nursing.module';
import { ClinicModule } from './clinic/clinic.module';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';

@Module({
  imports: [
    PasswordModule,
    SharedModule,
    ClinicModule,
    PatientModule,
    DoctorModule,
    AttendantModule,
    NursingModule,
  ],
})
export class ApplicationModule {}
