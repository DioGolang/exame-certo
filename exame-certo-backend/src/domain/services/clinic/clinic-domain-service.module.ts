import { Module } from '@nestjs/common';
import { ClinicDomainService } from './clinic-domain.service';
import { EncryptionModule } from '../../../infra/security/encryption/encryption.module';
import { UuidModule } from '../../../infra/services/uuid/uuid.module';
import { BuildModule } from '../../factories/build/build.module';

@Module({
  imports: [BuildModule, EncryptionModule, UuidModule],
  providers: [ClinicDomainService],
  exports: [ClinicDomainService],
})
export class ClinicDomainServiceModule {}
