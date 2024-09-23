import { Module } from '@nestjs/common';
import { ClinicQueryRepositoryModule } from '../../infra/persistence/mongodb/repositories/clinic-query-repository/clinic-query-repository.module';
import { ClinicCommandRepositoryModule } from '../../infra/persistence/postgres/repositories/clinic-command-repository/clinic-command-repository.module';
import { ClinicService } from './services/clinic.service';
import { CreateClinicCommand } from './commands/create-clinic.command';
import { CqrsModule } from '@nestjs/cqrs';
import { BuildersModule } from '../../domain/builders/builders.module';
import { GetClinicHandler } from './queries/get-clinic.handler';
import { ClinicCreatedConsumer } from './consumers/clinic-created.consumer';
import { CreateClinicEvent } from './events/create-clinic.event';
import { CreateClinicHandler } from './commands/create-clinic.handler';
import { ClinicSaga } from './saga/clinic.saga';
import { CreateClinicEventHandler } from './events/create-clinic-event.handler';

@Module({
  imports: [
    CqrsModule,
    ClinicQueryRepositoryModule,
    ClinicCommandRepositoryModule,
    BuildersModule,
  ],
  providers: [
    ClinicService,
    CreateClinicCommand,
    CreateClinicHandler,
    CreateClinicEventHandler,
    ClinicSaga,
    GetClinicHandler,
    ClinicCreatedConsumer,
    CreateClinicEvent,
  ],
  exports: [
    ClinicService,
    CreateClinicCommand,
    CreateClinicHandler,
    CreateClinicEventHandler,
    ClinicSaga,
    GetClinicHandler,
    ClinicCreatedConsumer,
    CreateClinicEvent,
  ],
})
export class ClinicModule {}
