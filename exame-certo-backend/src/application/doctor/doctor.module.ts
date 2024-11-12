import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
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
import { BuildModule } from '../../domain/factories/build/build.module';
import { PersistenceModule } from '../../domain/factories/persistence/persistence.module';
import { DoctorSaga } from './saga';
import { OutboxModule } from '../shared/services/outbox/outbox.module';

@Module({
  imports: [
    CqrsModule,
    DoctorQueryRepositoryModule,
    DoctorCommandRepositoryModule,
    BuildModule,
    PersistenceModule,
    DoctorDomainServiceModule,
    OutboxModule,
  ],
  providers: [
    DoctorService,
    EventPublisherService,
    ...Mappers,
    { provide: 'Mapper', useClass: DoctorMapper },
    ...CommandsHandlers,
    ...EventsHandlers,
    ...QueriesHandlers,
    ...Consumers,
    ...DoctorSaga,
  ],
  exports: [
    DoctorService,
    EventPublisherService,
    DoctorMapper,
    'Mapper',
    ...CommandsHandlers,
    ...EventsHandlers,
    ...QueriesHandlers,
    ...Consumers,
    ...DoctorSaga,
  ],
})
export class DoctorModule {}
