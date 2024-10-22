import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OutboxEntity } from '../../../../infra/persistence/postgres/entities/outbox.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OutboxApplicationService {
  constructor(
    @InjectRepository(OutboxEntity)
    private readonly outboxRepository: Repository<OutboxEntity>,
  ) {}

  async saveEvent(eventType: string, payload: any): Promise<OutboxEntity> {
    const outboxEntry = new OutboxEntity();
    outboxEntry.event_type = eventType;
    outboxEntry.payload = payload;
    return await this.outboxRepository.save(outboxEntry);
  }
}
