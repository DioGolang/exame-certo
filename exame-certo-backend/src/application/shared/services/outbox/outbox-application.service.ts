import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OutboxEntity } from '../../../../infra/persistence/postgres/entities/outbox.entity';
import { Repository } from 'typeorm';
import { OutboxStatus } from '../../../enums/outbox-status.enum';

@Injectable()
export class OutboxApplicationService {
  constructor(
    @InjectRepository(OutboxEntity)
    private readonly outboxRepository: Repository<OutboxEntity>,
  ) {}

  async save(eventType: string, payload: any, id: string): Promise<void> {
    const outboxEntry = new OutboxEntity();
    outboxEntry.id = id;
    outboxEntry.event_type = eventType;
    outboxEntry.payload = payload;
    await this.outboxRepository.save(outboxEntry);
  }

  async updateStatus(id: string, status: OutboxStatus): Promise<void> {
    const outboxEntry = await this.outboxRepository.findOne({ where: { id } });
    outboxEntry.status = status;
    await this.outboxRepository.save(outboxEntry);
  }
}
