import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BuildersModule } from '../../domain/builders/builders.module';
import { DoctorCommandRepositoryModule } from '../../infra/persistence/postgres/repositories/doctor-command-repository/doctor-command-repository.module';
import { DoctorQueryRepositoryModule } from '../../infra/persistence/mongodb/repositories/doctor-query-repository/doctor-query-repository.module';
import { DoctorService } from './services/doctor.service';
import { CommandsHandlers } from './commands';
import { EventsHandlers } from './events';
import { Consumers } from './consumers';
import { QueriesHandlers } from './queries';
import { Mappers } from './mappers';
import { DoctorDomainServiceModule } from '../../domain/services/doctor/doctor-domain-service.module';
import { DoctorMapper } from './mappers/doctor.mapper';
import { EventPublisherService } from './services/event-publisher.service';

@Module({
  imports: [
    CqrsModule,
    DoctorQueryRepositoryModule,
    DoctorCommandRepositoryModule,
    BuildersModule,
    DoctorDomainServiceModule,
  ],
  providers: [
    DoctorService,
    EventPublisherService,
    DoctorMapper,
    ...Mappers,
    ...CommandsHandlers,
    ...EventsHandlers,
    ...QueriesHandlers,
    ...Consumers,
  ],
  exports: [
    DoctorService,
    EventPublisherService,
    DoctorMapper,
    ...Mappers,
    ...CommandsHandlers,
    ...EventsHandlers,
    ...QueriesHandlers,
    ...Consumers,
  ],
})
export class DoctorModule {}
