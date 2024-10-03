import { forwardRef, Module } from '@nestjs/common';
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

@Module({
  imports: [
    CqrsModule,
    PatientQueryRepositoryModule,
    PatientCommandRepositoryModule,
    BuildersModule,
  ],
  providers: [
    PatientService,
    PatientMapper,
    ...CommandsHandlers,
    ...EventsHandlers,
    ...QueriesHandlers,
    ...Consumers,
  ],
  exports: [
    PatientService,
    PatientMapper,
    ...CommandsHandlers,
    ...EventsHandlers,
    ...QueriesHandlers,
    ...Consumers,
  ],
})
export class PatientModule {}
