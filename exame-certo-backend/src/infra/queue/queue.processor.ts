import { Processor, WorkerHost } from '@nestjs/bullmq';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Job } from 'bullmq';

@Processor('outbox-queue') // Nome da fila BullMQ
export class QueueProcessor extends WorkerHost {
  constructor(private readonly amqpConnection: AmqpConnection) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<void> {
    try {
      console.log(`Processando job ${job.id} com nome: ${job.name}`, job.data);

      const { event_type, payload } = job.data;

      // Publica o evento no RabbitMQ
      await this.amqpConnection.publish('events_exchange', event_type, payload);

      console.log(`Evento ${event_type} enviado com sucesso.`);
    } catch (error) {
      console.error(`Erro ao processar o job ${job.id}:`, error);

      // Lança erro para que o BullMQ possa lidar com retries
      throw new Error('Falha no processamento do evento');
    }
  }
}
