import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ServicesModule } from './services/services.module';
import { RabbitmqModule } from './messaging/rabbitmq/rabbitmq.module';

@Module({
  imports: [AuthModule, DatabaseModule, ServicesModule, RabbitmqModule],
})
export class InfraModule {}
