import { OutboxEntity } from '../../entities/outbox.entity';
import { Repository } from 'typeorm';
import { OutboxRepository } from '../../../../../application/interfaces/outbox-repository.interface';
import { OutboxDto } from '../../../../../application/shared/dtos/outbox.dto';

export class OutboxRepositoryImpl implements OutboxRepository {
  constructor(private readonly repository: Repository<OutboxEntity>) {}

  async save(outbox: OutboxDto): Promise<void> {
    await this.repository.save(outbox);
  }
}
