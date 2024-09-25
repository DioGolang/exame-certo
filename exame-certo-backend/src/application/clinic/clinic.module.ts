import { Module } from '@nestjs/common';
import { ClinicQueryRepositoryModule } from '../../infra/persistence/mongodb/repositories/clinic-query-repository/clinic-query-repository.module';
import { ClinicCommandRepositoryModule } from '../../infra/persistence/postgres/repositories/clinic-command-repository/clinic-command-repository.module';
import { ClinicService } from './services/clinic.service';
import { CqrsModule } from '@nestjs/cqrs';
import { BuildersModule } from '../../domain/builders/builders.module';
import { ClinicSaga } from './saga/clinic.saga';
import { CommandsHandlers } from './commands';
import { QueriesHandlers } from './queries';
import { EventsHandlers } from './events';
import { Consumers } from './consumers';

@Module({
  imports: [
    CqrsModule,
    ClinicQueryRepositoryModule,
    ClinicCommandRepositoryModule,
    BuildersModule,
  ],
  providers: [
    ClinicService,
    ...CommandsHandlers,
    ...EventsHandlers,
    ClinicSaga,
    ...QueriesHandlers,
    ...Consumers,
  ],
  exports: [
    ClinicService,
    ...CommandsHandlers,
    ...EventsHandlers,
    ClinicSaga,
    ...QueriesHandlers,
    ...Consumers,
  ],
})
export class ClinicModule {}
