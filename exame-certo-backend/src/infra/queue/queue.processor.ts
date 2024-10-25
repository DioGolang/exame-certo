import { Processor, WorkerHost } from '@nestjs/bullmq';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Job } from 'bullmq';
import { OutboxApplicationService } from '../../application/shared/services/outbox/outbox-application.service';
import { OutboxStatus } from '../../application/enums/outbox-status.enum';

@Processor('outbox-queue') // Nome da fila BullMQ
export class QueueProcessor extends WorkerHost {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly outboxRepository: OutboxApplicationService,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<void> {
    try {
      console.log(`Processando job ${job.id} com nome: ${job.name}`, job.data);
      const { event_type, payload, idOutbox } = job.data;
      await this.amqpConnection.publish(
        'events_exchange',
        event_type,
        {
          event: payload,
          idOutbox,
        },
        {
          headers: {
            'x-dead-letter-exchange': 'dlx_exchange',
          },
        },
      );
      await this.outboxRepository.updateStatus(idOutbox, OutboxStatus.SENT);
      console.log(`Evento ${event_type} enviado com sucesso.`);
    } catch (error) {
      console.error(`Erro ao processar o job ${job.id}:`, error);
      throw new Error('Falha no processamento do evento!');
    }
  }
}
