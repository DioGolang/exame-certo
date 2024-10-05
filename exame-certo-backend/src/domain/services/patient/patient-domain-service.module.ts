import { Module } from '@nestjs/common';
import { PatientDomainService } from './patient-domain.service';

@Module({
  imports: [],
  providers: [PatientDomainService],
  exports: [PatientDomainService],
})
export class PatientDomainServiceModule {}
