import { Module } from '@nestjs/common';
import { ClinicDomainService } from './clinic-domain.service';
import { BuildersModule } from '../../builders/builders.module';
import { EncryptionModule } from '../../../infra/security/encryption/encryption.module';

@Module({
  imports: [BuildersModule, EncryptionModule],
  providers: [ClinicDomainService],
  exports: [ClinicDomainService],
})
export class ClinicDomainServiceModule {}
