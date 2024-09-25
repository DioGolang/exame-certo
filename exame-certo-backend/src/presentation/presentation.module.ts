import { Module } from '@nestjs/common';
import { ClinicControllersModule } from './clinic/http/controllers/clinic-controllers.module';
import { DoctorControllersModule } from './doctor/http/controllers/doctor-controllers.module';

@Module({
  imports: [ClinicControllersModule, DoctorControllersModule],
})
export class PresentationModule {}
