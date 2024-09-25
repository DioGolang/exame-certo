import { Module } from '@nestjs/common';
import { DoctorModule } from '../../../../application/doctor/doctor.module';
import { DoctorController } from './doctor.controller';

@Module({
  imports: [DoctorModule],
  controllers: [DoctorController],
})
export class DoctorControllersModule {}
