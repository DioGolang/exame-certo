import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PatientQueryRepositoryModule } from '../../infra/persistence/mongodb/repositories/patient-query-repository/patient-query-repository.module';
import { PatientCommandRepositoryModule } from '../../infra/persistence/postgres/repositories/patient-command-repository/patient-command-repository.module';
import { BuildersModule } from '../../domain/builders/builders.module';
import { PatientService } from './services/patient.service';
import { CommandsHandlers } from './commands';
import { EventsHandlers } from './events';
import { QueriesHandlers } from './queries';
import { Consumers } from './consumers';
import { PatientMapper } from './mappers/patient.mapper';
import { EventPublisherService } from './services/event-publisher.service';
import { PatientDomainServiceModule } from '../../domain/services/patient/patient-domain-service.module';

@Module({
  imports: [
    CqrsModule,
    PatientQueryRepositoryModule,
    PatientCommandRepositoryModule,
    BuildersModule,
    PatientDomainServiceModule,
  ],
  providers: [
    PatientService,
    PatientMapper,
    EventPublisherService,
    ...CommandsHandlers,
    ...EventsHandlers,
    ...QueriesHandlers,
    ...Consumers,
  ],
  exports: [
    PatientService,
    PatientMapper,
    EventPublisherService,
    ...CommandsHandlers,
    ...EventsHandlers,
    ...QueriesHandlers,
    ...Consumers,
  ],
})
export class PatientModule {}
