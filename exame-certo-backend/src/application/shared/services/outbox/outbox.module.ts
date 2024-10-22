import { Module } from '@nestjs/common';
import { OutboxApplicationService } from './outbox-application.service';
import { OutboxRepositoryModule } from '../../../../infra/persistence/postgres/repositories/outbox-repository/outbox-repository.module';

@Module({
  imports: [OutboxRepositoryModule],
  providers: [OutboxApplicationService],
  exports: [OutboxApplicationService],
})
export class OutboxModule {}
