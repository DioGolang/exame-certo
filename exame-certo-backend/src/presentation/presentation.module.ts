import { Module } from '@nestjs/common';
import { ClinicControllersModule } from './clinic/http/controllers/clinic-controllers.module';

@Module({
  imports: [ClinicControllersModule]
})
export class PresentationModule {}
