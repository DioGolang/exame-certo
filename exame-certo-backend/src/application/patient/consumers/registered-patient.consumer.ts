import { Inject, Injectable } from '@nestjs/common';
import { PatientQueryRepository } from '../../../domain/repositories/patient-query.repository';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RegisteredPatientEventDto } from '../dto/registered-patient-event.dto';
import { Mapper } from '../../interfaces/mapper.interface';
import { Patient } from '../../../domain/entities/patient.entity';
import { PatientEntity } from '../../../infra/persistence/postgres/entities/patient.entity';
import { Patient as PatientDocument } from '../../../infra/persistence/mongodb/schemas/patient.schema';
import { OutboxApplicationService } from '../../shared/services/outbox/outbox-application.service';
import { OutboxStatus } from '../../enums/outbox-status.enum';

@Injectable()
export class RegisteredPatientConsumer {
  constructor(
    @Inject('PatientQueryRepository')
    private readonly patientMongoRepository: PatientQueryRepository,
    private readonly outboxRepository: OutboxApplicationService,
    @Inject('Mapper')
    private readonly patientMapper: Mapper<
      Patient,
      PatientEntity,
      PatientDocument,
      RegisteredPatientEventDto
    >,
  ) {}

  @RabbitSubscribe({
    exchange: 'events_exchange',
    routingKey: 'patient.registered',
    queue: 'patient_registered_queue',
    queueOptions: {
      durable: true,
      arguments: {
        'x-dead-letter-exchange': 'dlx_exchange',
      },
    },
  })
  public async handler(message: {
    event: RegisteredPatientEventDto;
    idOutbox: string;
  }) {
    const { event, idOutbox } = message;
    console.log(
      `Recebido evento de registro do paciente: ${JSON.stringify(event)}`,
    );

    console.log(`Recebido evento e id do Outbox: ${idOutbox}`);

    try {
      await this.patientMongoRepository.save(
        this.patientMapper.fromRegisteredEntityEventDtoToDocument(event),
      );
    } catch (e) {
      console.error(
        `Falha ao salvar o paciente no MongoDB: ${JSON.stringify(e)}`,
      );
      await this.outboxRepository.updateStatus(idOutbox, OutboxStatus.ERROR);
    }
  }
}
