import { Module } from '@nestjs/common';
import { ClinicController } from './clinic.controller';
import { ClinicModule } from '../../../../application/clinic/clinic.module';

@Module({
  imports: [ClinicModule],
  controllers: [ClinicController],
})
export class ClinicControllersModule {}
