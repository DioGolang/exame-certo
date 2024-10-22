import { Module } from '@nestjs/common';
import { OutboxApplicationService } from './outbox-application.service';
import { OutboxRepositoryModule } from '../../../../infra/persistence/postgres/repositories/outbox-repository/outbox-repository.module';
import { OutboxOrchestratorService } from './outbox-orchestrator.service';

@Module({
  imports: [OutboxRepositoryModule],
  providers: [OutboxApplicationService, OutboxOrchestratorService],
  exports: [OutboxApplicationService, OutboxOrchestratorService],
})
export class OutboxModule {}
