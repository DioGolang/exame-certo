import { Module } from '@nestjs/common';
import { OutboxApplicationService } from './outbox-application.service';
import { OutboxRepositoryModule } from '../../../../infra/persistence/postgres/repositories/outbox-repository/outbox-repository.module';
import { OutboxOrchestratorService } from './outbox-orchestrator.service';
import { UuidModule } from '../../../../infra/services/uuid/uuid.module';

@Module({
  imports: [OutboxRepositoryModule, UuidModule],
  providers: [OutboxApplicationService, OutboxOrchestratorService],
  exports: [OutboxApplicationService, OutboxOrchestratorService],
})
export class OutboxModule {}
