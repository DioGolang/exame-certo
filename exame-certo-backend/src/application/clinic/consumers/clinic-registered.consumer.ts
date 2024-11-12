import { Inject, Injectable } from '@nestjs/common';
import { ClinicQueryRepository } from '../../../domain/repositories/clinic-query.repository';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { CreateClinicEventDto } from '../dto/create-clinic-event.dto';
import { OutboxApplicationService } from '../../shared/services/outbox/outbox-application.service';
import { Clinic as ClinicDocument } from '../../../infra/persistence/mongodb/schemas/clinic.schema';
import { ClinicEntity } from '../../../infra/persistence/postgres/entities/clinic.entity';
import { Clinic } from '../../../domain/entities/clinic.entity';
import { Mapper } from '../../interfaces/mapper.interface';
import { OutboxStatus } from '../../enums/outbox-status.enum';

@Injectable()
export class ClinicRegisteredConsumer {
  constructor(
    @Inject('ClinicQueryRepository')
    private readonly clinicMongoRepository: ClinicQueryRepository,
    private readonly outboxRepository: OutboxApplicationService,
    @Inject('Mapper')
    private readonly clinicMapper: Mapper<
      Clinic,
      ClinicEntity,
      ClinicDocument,
      CreateClinicEventDto
    >,
  ) {}

  @RabbitSubscribe({
    exchange: 'events_exchange',
    routingKey: 'clinic.registered',
    queue: 'clinic_registered_queue',
    queueOptions: {
      deadLetterExchange: 'dlx_exchange',
      deadLetterRoutingKey: 'clinic.registered.dlq',
    },
  })
  public async handler(message: {
    event: CreateClinicEventDto;
    idOutbox: string;
  }) {
    const { event, idOutbox } = message;
    console.log(
      `Recebido evento de criação da clínica: ${JSON.stringify(event)}`,
    );
    console.log(`Recebido evento e id do Outbox: ${idOutbox}`);

    try {
      await this.clinicMongoRepository.save(
        this.clinicMapper.fromRegisteredEntityEventDtoToDocument(event),
      );
    } catch (e) {
      console.error(
        `Falha ao salvar a clínica no MongoDB: ${JSON.stringify(e)}`,
      );
      await this.outboxRepository.updateStatus(idOutbox, OutboxStatus.ERROR);
    }
  }
}
