import { Module } from '@nestjs/common';
import { AuthModule } from './security/auth/auth.module';
import { ServicesModule } from './services/services.module';
import { DatabaseModule } from './persistence/database/database.module';
import { RabbitmqConfigModule } from './messaging/rabbitmq/rabbitmq-config.module';
import { CommandRepositoriesModule } from './persistence/postgres/repositories/command-repositories.module';
import { QueryRepositoriesModule } from './persistence/mongodb/repositories/query-repositories.module';
import { EncryptionModule } from './security/encryption/encryption.module';

@Module({
  imports: [
    AuthModule,
    ServicesModule,
    DatabaseModule,
    RabbitmqConfigModule,
    CommandRepositoriesModule,
    QueryRepositoriesModule,
    EncryptionModule,
  ],
})
export class InfraModule {}
