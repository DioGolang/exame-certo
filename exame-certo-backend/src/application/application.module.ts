import { Module } from '@nestjs/common';
import { PasswordModule } from './shared/services/password/password.module';

@Module({
  imports: [PasswordModule],
})
export class ApplicationModule {}
