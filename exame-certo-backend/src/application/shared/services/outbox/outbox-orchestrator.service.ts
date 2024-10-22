import { Injectable } from '@nestjs/common';
import { QueueService } from '../../../../infra/queue/queue.service';
import { OutboxApplicationService } from './outbox-application.service';

@Injectable()
export class OutboxOrchestratorService {
  constructor(
    private readonly outboxRepository: OutboxApplicationService,
    private readonly queueService: QueueService,
  ) {}

  async processEvent(eventType: string, payload: any): Promise<void> {
    const outboxEntry = await this.outboxRepository.saveEvent(
      eventType,
      payload,
    );
    await this.queueService.enqueueEvent(
      outboxEntry.event_type,
      outboxEntry.payload,
    );
  }
}
