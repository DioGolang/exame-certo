import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '../../../../infra/queue/queue.service';
import { OutboxApplicationService } from './outbox-application.service';
import { UuidGenerator } from '../../../../domain/interfaces/uuid-generator.interface';
import { EventDto } from '../../../interfaces/event.dto.interface';

@Injectable()
export class OutboxOrchestratorService {
  constructor(
    private readonly outboxRepository: OutboxApplicationService,
    private readonly queueService: QueueService,
    @Inject('UuidGenerator')
    private readonly uuidGeneratorService: UuidGenerator,
  ) {}

  async processEvent(eventType: string, payload: EventDto): Promise<void> {
    const id = this.uuidGeneratorService.generate();
    await this.outboxRepository.save(eventType, payload, id);
    await this.queueService.enqueueEvent(eventType, payload, id);
  }
}
