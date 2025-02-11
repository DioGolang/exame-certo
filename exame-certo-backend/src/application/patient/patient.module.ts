import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PatientQueryRepositoryModule } from '../../infra/persistence/mongodb/repositories/patient-query-repository/patient-query-repository.module';
import { PatientCommandRepositoryModule } from '../../infra/persistence/postgres/repositories/patient-command-repository/patient-command-repository.module';
import { PatientService } from './services/patient.service';
import { CommandsHandlers } from './commands';
import { EventsHandlers } from './events';
import { QueriesHandlers } from './queries';
import { Consumers } from './consumers';
import { PatientMapper } from './mappers/patient.mapper';
import { EventPublisherService } from './services/event-publisher.service';
import { PatientDomainServiceModule } from '../../domain/services/patient/patient-domain-service.module';
import { BuildModule } from '../../domain/factories/build/build.module';
import { PersistenceModule } from '../../domain/factories/persistence/persistence.module';
import { OutboxModule } from '../shared/services/outbox/outbox.module';
import { PatientSaga } from './saga';

@Module({
  imports: [
    CqrsModule,
    PatientQueryRepositoryModule,
    PatientCommandRepositoryModule,
    BuildModule,
    PersistenceModule,
    PatientDomainServiceModule,
    OutboxModule,
  ],
  providers: [
    PatientService,
    PatientMapper,
    {
      provide: 'Mapper',
      useClass: PatientMapper,
    },
    EventPublisherService,
    ...CommandsHandlers,
    ...EventsHandlers,
    ...QueriesHandlers,
    ...Consumers,
    ...PatientSaga,
  ],
  exports: [
    PatientService,
    'Mapper',
    EventPublisherService,
    ...CommandsHandlers,
    ...EventsHandlers,
    ...QueriesHandlers,
    ...Consumers,
    ...PatientSaga,
  ],
})
export class PatientModule {}