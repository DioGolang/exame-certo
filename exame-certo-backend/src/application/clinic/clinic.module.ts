import { Module } from '@nestjs/common';
import { ClinicQueryRepositoryModule } from '../../infra/persistence/mongodb/repositories/clinic-query-repository/clinic-query-repository.module';
import { ClinicCommandRepositoryModule } from '../../infra/persistence/postgres/repositories/clinic-command-repository/clinic-command-repository.module';
import { ClinicService } from './services/clinic.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsHandlers } from './commands';
import { QueriesHandlers } from './queries';
import { EventsHandlers } from './events';
import { Consumers } from './consumers';
import { EventPublisherService } from './services/event-publisher.service';
import { ClinicMapper } from './mappers/clinic.mapper';
import { ClinicDomainServiceModule } from '../../domain/services/clinic/clinic-domain-service.module';
import { BuildModule } from '../../domain/factories/build/build.module';
import { PersistenceModule } from '../../domain/factories/persistence/persistence.module';
import { ClinicSaga } from './saga';
import { OutboxModule } from '../shared/services/outbox/outbox.module';

@Module({
  imports: [
    CqrsModule,
    ClinicQueryRepositoryModule,
    ClinicCommandRepositoryModule,
    BuildModule,
    PersistenceModule,
    ClinicDomainServiceModule,
    OutboxModule,
  ],
  providers: [
    ClinicService,
    EventPublisherService,
    ClinicMapper,
    {
      provide: 'Mapper',
      useClass: ClinicMapper,
    },
    ...CommandsHandlers,
    ...EventsHandlers,
    ...ClinicSaga,
    ...QueriesHandlers,
    ...Consumers,
  ],
  exports: [
    ClinicService,
    EventPublisherService,
    ClinicMapper,
    ...CommandsHandlers,
    ...EventsHandlers,
    ...ClinicSaga,
    ...QueriesHandlers,
    ...Consumers,
  ],
})
export class ClinicModule {}
