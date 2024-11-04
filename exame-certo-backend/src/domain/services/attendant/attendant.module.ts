import { Module } from '@nestjs/common';
import { AttendantService } from './attendant.service';
import { BuildModule } from '../../factories/build/build.module';
import { EncryptionModule } from '../../../infra/security/encryption/encryption.module';
import { UuidModule } from '../../../infra/services/uuid/uuid.module';

@Module({
  imports: [BuildModule, EncryptionModule, UuidModule],
  providers: [AttendantService],
  exports: [AttendantService],
})
export class AttendantModule {}
