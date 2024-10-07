import { Module } from '@nestjs/common';
import { ClinicDomainService } from './clinic-domain.service';
import { BuildersModule } from '../../builders/builders.module';

@Module({
  imports: [BuildersModule],
  providers: [ClinicDomainService],
  exports: [ClinicDomainService],
})
export class ClinicDomainServiceModule {}
