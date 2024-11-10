import { Module } from '@nestjs/common';
import { NursingDomainService } from './nursing-domain.service';
import { BuildModule } from '../../factories/build/build.module';
import { EncryptionModule } from '../../../infra/security/encryption/encryption.module';
import { UuidModule } from '../../../infra/services/uuid/uuid.module';

@Module({
  imports: [BuildModule, EncryptionModule, UuidModule],
  providers: [NursingDomainService],
  exports: [NursingDomainService],
})
export class NursingDomainModule {}