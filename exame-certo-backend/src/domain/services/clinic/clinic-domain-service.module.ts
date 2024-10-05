import { Module } from '@nestjs/common';
import { ClinicDomainService } from './clinic-domain.service';

@Module({
  providers: [ClinicDomainService],
  exports: [ClinicDomainService],
})
export class ClinicDomainServiceModule {}
