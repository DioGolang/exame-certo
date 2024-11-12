import { Inject, Injectable } from '@nestjs/common';
import { DoctorQueryRepository } from '../../../domain/repositories/doctor-query.repository';
import { OutboxApplicationService } from '../../shared/services/outbox/outbox-application.service';
import { Mapper } from '../../interfaces/mapper.interface';
import { Doctor } from '../../../domain/entities/doctor.entity';
import { DoctorEntity } from '../../../infra/persistence/postgres/entities/doctor.entity';
import { Doctor as DoctorDocument } from '../../../infra/persistence/mongodb/schemas/doctor.schema';
import { CreateDoctorEventDto } from '../dto/create-doctor-event.dto';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { OutboxStatus } from '../../enums/outbox-status.enum';

@Injectable()
export class DoctorRegisteredConsumer {
  constructor(
    @Inject('DoctorQueryRepository')
    private readonly doctorQueryRepository: DoctorQueryRepository,
    private readonly outboxRepository: OutboxApplicationService,
    @Inject('Mapper')
    private readonly doctorMapper: Mapper<
      Doctor,
      DoctorEntity,
      DoctorDocument,
      CreateDoctorEventDto
    >,
  ) {}

  @RabbitSubscribe({
    exchange: 'events_exchange',
    routingKey: 'doctor.registered',
    queue: 'doctor_registered_queue',
    queueOptions: {
      deadLetterExchange: 'dlx_exchange',
      deadLetterRoutingKey: 'doctor.registered.dlq',
    },
  })
  public async handler(message: {
    event: CreateDoctorEventDto;
    idOutbox: string;
  }) {
    const { event, idOutbox } = message;
    console.log(
      `Recebido evento de criação do médico: ${JSON.stringify(event)}`,
    );
    console.log(`Recebido evento e id do Outbox: ${idOutbox}`);

    try {
      await this.doctorQueryRepository.save(
        this.doctorMapper.fromRegisteredEntityEventDtoToDocument(event),
      );
    } catch (e) {
      console.error(
        `Falha ao salvar o médico no MongoDB: ${JSON.stringify(e)}`,
        e.stack,
      );
      await this.outboxRepository.updateStatus(idOutbox, OutboxStatus.ERROR);
    }
  }
}
