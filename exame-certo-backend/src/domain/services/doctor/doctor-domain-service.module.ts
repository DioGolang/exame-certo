import { Module } from '@nestjs/common';
import { DoctorDomainService } from './doctor-domain.service';

@Module({
  imports: [],
  providers: [DoctorDomainService],
  exports: [DoctorDomainService],
})
export class DoctorDomainServiceModule {}
