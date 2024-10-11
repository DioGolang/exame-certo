import { Module } from '@nestjs/common';
import { PatientDomainService } from './patient-domain.service';
import { BuildersModule } from '../../builders/builders.module';
import { EncryptionModule } from '../../../infra/security/encryption/encryption.module';
import { UuidModule } from '../../../infra/services/uuid/uuid.module';

@Module({
  imports: [BuildersModule, EncryptionModule, UuidModule],
  providers: [PatientDomainService],
  exports: [PatientDomainService],
})
export class PatientDomainServiceModule {}
