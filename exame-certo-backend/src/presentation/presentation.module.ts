import { Module } from '@nestjs/common';
import { ClinicController } from './controllers/clinic/clinic.controller';
import { ClinicModule } from '../modules/clinic/clinic.module';

@Module({
  imports: [ClinicModule],
  controllers: [ClinicController],
})
export class PresentationModule {}
