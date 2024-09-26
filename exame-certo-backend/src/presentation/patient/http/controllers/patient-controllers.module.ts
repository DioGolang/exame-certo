import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientModule } from '../../../../application/patient/patient.module';

@Module({
  imports: [PatientModule],
  controllers: [PatientController],
})
export class PatientControllersModule {}
