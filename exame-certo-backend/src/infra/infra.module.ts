import { Module } from '@nestjs/common';
import { AuthModule } from './security/auth/auth.module';
import { ServicesModule } from './services/services.module';
import { DatabaseModule } from './persistence/database/database.module';
import { RabbitmqModule } from './messaging/rabbitmq/rabbitmq.module';
import { CommandRepositoriesModule } from './persistence/postgres/repositories/command-repositories.module';
import { QueryRepositoriesModule } from './persistence/mongodb/repositories/query-repositories.module';
import { EncryptionModule } from './security/encryption/encryption.module';
import { MappingModule } from './mapping/mapping.module';

@Module({
  imports: [
    AuthModule,
    ServicesModule,
    DatabaseModule,
    RabbitmqModule,
    CommandRepositoriesModule,
    QueryRepositoriesModule,
    EncryptionModule,
    MappingModule,
  ],
})
export class InfraModule {}
