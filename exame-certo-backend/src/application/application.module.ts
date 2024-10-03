import { Module } from '@nestjs/common';
import { PasswordModule } from './shared/services/password/password.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [PasswordModule, SharedModule],
})
export class ApplicationModule {}
