import { Inject, Injectable } from '@nestjs/common';
import { AttendantQueryRepository } from '../../../domain/repositories/attendant-query.repository';
import { OutboxApplicationService } from '../../shared/services/outbox/outbox-application.service';
import { Mapper } from '../../interfaces/mapper.interface';
import { Attendant } from '../../../domain/entities/attendant.entity';
import { AttendantEntity } from '../../../infra/persistence/postgres/entities/attendant.entity';
import { Attendant as AttendantDocument } from '../../../infra/persistence/mongodb/schemas/attendant.schema';
import { RegisteredAttendantEventDto } from '../dto/registered-attendant-event.dto';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { OutboxStatus } from '../../enums/outbox-status.enum';

@Injectable()
export class RegisteredAttendantConsumer {
  constructor(
    @Inject('AttendantQueryRepository')
    private readonly attendantMongoRepository: AttendantQueryRepository,
    private readonly outboxRepository: OutboxApplicationService,
    @Inject('Mapper')
    private readonly attendantMapper: Mapper<
      Attendant,
      AttendantEntity,
      AttendantDocument,
      RegisteredAttendantEventDto
    >,
  ) {}

  @RabbitSubscribe({
    exchange: 'events_exchange',
    routingKey: 'attendant.registered',
    queue: 'attendant_registered_queue',
    queueOptions: {
      deadLetterExchange: 'dlx_exchange',
      deadLetterRoutingKey: 'attendant.registered.dlq',
    },
  })
  async handler(message: {
    event: RegisteredAttendantEventDto;
    idOutbox: string;
  }): Promise<void> {
    const { event, idOutbox } = message;
    console.log(
      `Recebido evento de registro do paciente: ${JSON.stringify(event)}`,
    );
    console.log(`Recebido evento e id do Outbox: ${idOutbox}`);
    try {
      await this.attendantMongoRepository.save(
        this.attendantMapper.fromRegisteredEntityEventDtoToDocument(event),
      );
    } catch (e) {
      console.error(
        `Falha ao salvar o paciente no MongoDB: ${JSON.stringify(e)}`,
      );
      await this.outboxRepository.updateStatus(idOutbox, OutboxStatus.ERROR);
    }
  }
}
