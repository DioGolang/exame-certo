import { Module } from '@nestjs/common';
import { ClinicControllersModule } from './clinic/http/controllers/clinic-controllers.module';
import { DoctorControllersModule } from './doctor/http/controllers/doctor-controllers.module';
import { PatientControllersModule } from './patient/http/controllers/patient-controllers.module';
import { AttendantControllersModule } from './attendant/http/controllers/attendant-controllers.module';
import { NursingControllersModule } from './nursing/http/controllers/nursing-controllers.module';

@Module({
  imports: [
    ClinicControllersModule,
    DoctorControllersModule,
    PatientControllersModule,
    NursingControllersModule,
  ],
})
export class PresentationModule {}
