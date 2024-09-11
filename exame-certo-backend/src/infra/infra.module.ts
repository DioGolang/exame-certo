import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [AuthModule, DatabaseModule, ServicesModule],
})
export class InfraModule {}
