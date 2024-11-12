import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AttendantCommandRepositoryModule } from '../../infra/persistence/postgres/repositories/attendant-command-repository/attendant-command-repository.module';
import { AttendantQueryRepositoryModule } from '../../infra/persistence/mongodb/repositories/attendant-query-repository/attendant-query-repository.module';
import { BuildModule } from '../../domain/factories/build/build.module';
import { PersistenceModule } from '../../domain/factories/persistence/persistence.module';
import { AttendantDomainModule } from '../../domain/services/attendant/attendant-domain.module';
import { OutboxModule } from '../shared/services/outbox/outbox.module';
import { CommandsHandlers } from './commands';
import { EventsHandlers } from './events';
import { QueriesHandlers } from './queries';
import { Consumers } from './consumers';
import { AttendantSaga } from './saga';
import { AttendantMapper } from './mappers/attendant.mapper';
import { AttendantService } from './services/Attendant.service';

@Module({
  imports: [
    CqrsModule,
    AttendantCommandRepositoryModule,
    AttendantQueryRepositoryModule,
    BuildModule,
    PersistenceModule,
    AttendantDomainModule,
    OutboxModule,
  ],
  providers: [
    AttendantMapper,
    AttendantService,
    {
      provide: 'Mapper',
      useClass: AttendantMapper,
    },
    ...CommandsHandlers,
    ...EventsHandlers,
    ...QueriesHandlers,
    ...Consumers,
    ...AttendantSaga,
  ],
  exports: [
    AttendantService,
    'Mapper',
    ...CommandsHandlers,
    ...EventsHandlers,
    ...QueriesHandlers,
    ...Consumers,
    ...AttendantSaga,
  ],
})
export class AttendantModule {}
