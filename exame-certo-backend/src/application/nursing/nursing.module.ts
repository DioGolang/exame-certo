import { Module } from '@nestjs/common';
import { CommandsHandlers } from './commands';
import { EventsHandlers } from './events';
import { QueriesHandlers } from './queries';
import { Consumers } from './consumers';
import { NursingSaga } from './saga';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistenceModule } from '../../domain/factories/persistence/persistence.module';
import { BuildModule } from '../../domain/factories/build/build.module';
import { OutboxModule } from '../shared/services/outbox/outbox.module';
import { NursingDomainModule } from '../../domain/services/nursing/nursing-domain.module';
import { NursingQueryRepositoryModule } from '../../infra/persistence/mongodb/repositories/nursing-query-repository/nursing-query-repository.module';
import { NursingCommandRepositoryModule } from '../../infra/persistence/postgres/repositories/nursing-command-repository/nursing-command-repository.module';
import { NursingMapper } from './mappers/nursing.mapper';
import { NursingService } from './services/nursing.service';

@Module({
  imports: [
    CqrsModule,
    NursingQueryRepositoryModule,
    NursingCommandRepositoryModule,
    BuildModule,
    PersistenceModule,
    NursingDomainModule,
    OutboxModule,
  ],
  providers: [
    NursingMapper,
    NursingService,
    {
      provide: 'Mapper',
      useClass: NursingMapper,
    },
    ...CommandsHandlers,
    ...EventsHandlers,
    ...QueriesHandlers,
    ...Consumers,
    ...NursingSaga,
  ],
  exports: [
    NursingService,
    'Mapper',
    ...CommandsHandlers,
    ...EventsHandlers,
    ...QueriesHandlers,
    ...Consumers,
    ...NursingSaga,
  ],
})
export class NursingModule {}
