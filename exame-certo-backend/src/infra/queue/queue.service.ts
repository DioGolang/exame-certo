import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { RegisteredPatientEvent } from '../../application/patient/events/registered-patient.event';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('outbox-queue') private readonly outboxQueue: Queue,
  ) {}

  public async addRegisteredPatientEventToQueue(
    registeredPatientEvent: RegisteredPatientEvent,
  ): Promise<void> {
    await this.outboxQueue.add('registered-patient', registeredPatientEvent);
    console.log('Evento adicionado à fila Redis', registeredPatientEvent);
  }
}
