import { Module } from '@nestjs/common';
import { PatientDomainService } from './patient-domain.service';
import { EncryptionModule } from '../../../infra/security/encryption/encryption.module';
import { UuidModule } from '../../../infra/services/uuid/uuid.module';
import { BuildModule } from '../../factories/build/build.module';

@Module({
  imports: [BuildModule, EncryptionModule, UuidModule],
  providers: [PatientDomainService],
  exports: [PatientDomainService],
})
export class PatientDomainServiceModule {}
