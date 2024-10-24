import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('outbox-queue') private readonly outboxQueue: Queue,
  ) {}

  async enqueueEvent(
    eventType: string,
    payload: any,
    idOutbox: string,
  ): Promise<void> {
    await this.outboxQueue.add('process-event', {
      event_type: eventType,
      payload,
      idOutbox,
    });
  }
}
