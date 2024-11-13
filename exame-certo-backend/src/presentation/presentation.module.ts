import { Module } from '@nestjs/common';
import { ClinicControllersModule } from './clinic/http/controllers/clinic-controllers.module';
import { DoctorControllersModule } from './doctor/http/controllers/doctor-controllers.module';
import { PatientControllersModule } from './patient/http/controllers/patient-controllers.module';
import { AttendantControllersModule } from './attendant/http/controllers/attendant-controllers.module';
import { NursingControllersModule } from './nursing/http/controllers/nursing-controllers.module';
import { AuthControllersModule } from './auth/http/controllers/auth-controllers.module';

@Module({
  imports: [
    ClinicControllersModule,
    DoctorControllersModule,
    PatientControllersModule,
    NursingControllersModule,
    AttendantControllersModule,
    AuthControllersModule,
  ],
})
export class PresentationModule {}
