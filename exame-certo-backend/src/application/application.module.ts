import { Module } from '@nestjs/common';
import { PasswordModule } from './shared/services/password/password.module';
import { SharedModule } from './shared/shared.module';
import { AttendantModule } from './attendant/attendant.module';
import { NursingModule } from './nursing/nursing.module';

@Module({
  imports: [PasswordModule, SharedModule, AttendantModule, NursingModule],
})
export class ApplicationModule {}
