import { Module } from '@nestjs/common';
import { ClinicController } from './controllers/clinic/clinic.controller';

@Module({
  controllers: [ClinicController]
})
export class PresentationModule {}
