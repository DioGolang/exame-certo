import { Module } from '@nestjs/common';
import { DoctorDomainService } from './doctor-domain.service';
import { BuildersModule } from '../../builders/builders.module';
import { EncryptionModule } from '../../../infra/security/encryption/encryption.module';

@Module({
  imports: [BuildersModule, EncryptionModule],
  providers: [DoctorDomainService],
  exports: [DoctorDomainService],
})
export class DoctorDomainServiceModule {}
