import { Module } from '@nestjs/common';
import { AttendantDomainService } from './attendant-domain.service';
import { BuildModule } from '../../factories/build/build.module';
import { EncryptionModule } from '../../../infra/security/encryption/encryption.module';
import { UuidModule } from '../../../infra/services/uuid/uuid.module';

@Module({
  imports: [BuildModule, EncryptionModule, UuidModule],
  providers: [AttendantDomainService],
  exports: [AttendantDomainService],
})
export class AttendantDomainModule {}
