import { Inject, Injectable } from '@nestjs/common';
import { NursingQueryRepository } from '../../../domain/repositories/nursing-query.repository';
import { OutboxApplicationService } from '../../shared/services/outbox/outbox-application.service';
import { Mapper } from '../../interfaces/mapper.interface';
import { Nursing } from '../../../domain/entities/nursing.entity';
import { NursingEntity } from '../../../infra/persistence/postgres/entities/nursing.entity';
import { Nursing as NursingDocument } from '../../../infra/persistence/mongodb/schemas/nursing.schema';
import { RegisteredNursingEventDto } from '../dto/registered-nursing-event.dto';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { OutboxStatus } from '../../enums/outbox-status.enum';

@Injectable()
export class RegisteredNursingConsumer {
  constructor(
    @Inject('NursingQueryRepository')
    private readonly nursingQueryRepository: NursingQueryRepository,
    private readonly outboxRepository: OutboxApplicationService,
    @Inject('Mapper')
    private readonly nursingMapper: Mapper<
      Nursing,
      NursingEntity,
      NursingDocument,
      RegisteredNursingEventDto
    >,
  ) {}

  @RabbitSubscribe({
    exchange: 'events_exchange',
    routingKey: 'nursing.registered',
    queue: 'nursing_registered_queue',
    queueOptions: {
      deadLetterExchange: 'dlx_exchange',
      deadLetterRoutingKey: 'nursing.registered.dlq',
    },
  })
  public async handler(message: {
    event: RegisteredNursingEventDto;
    idOutbox: string;
  }) {
    const { event, idOutbox } = message;
    console.log(
      `Recebido evento de registro do paciente: ${JSON.stringify(event)}`,
    );
    console.log(`Recebido evento e id do Outbox: ${idOutbox}`);
    try {
      await this.nursingQueryRepository.save(
        this.nursingMapper.fromRegisteredEntityEventDtoToDocument(event),
      );
    } catch (e) {
      console.error(
        `Falha ao salvar o paciente no MongoDB: ${JSON.stringify(e)}`,
      );
      await this.outboxRepository.updateStatus(idOutbox, OutboxStatus.ERROR);
    }
  }
}
