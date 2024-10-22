import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('outbox-queue') private readonly outboxQueue: Queue,
  ) {}

  // public async enqueueEvent(
  //   registeredPatientEvent: RegisteredPatientEvent,
  // ): Promise<void> {
  //   await this.outboxQueue.add('registered-patient', registeredPatientEvent);
  //   console.log('Evento adicionado à fila Redis', registeredPatientEvent);
  // }
  async enqueueEvent(eventType: string, payload: any): Promise<void> {
    await this.outboxQueue.add('process-event', {
      event_type: eventType,
      payload,
    });
  }
}
