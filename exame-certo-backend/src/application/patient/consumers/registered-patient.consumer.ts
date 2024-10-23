import { Inject, Injectable } from '@nestjs/common';
import { PatientQueryRepository } from '../../../domain/repositories/patient-query.repository';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RegisteredPatientEventDto } from '../dto/registered-patient-event.dto';
import { Mapper } from '../../interfaces/mapper.interface';
import { Patient } from '../../../domain/entities/patient.entity';
import { PatientEntity } from '../../../infra/persistence/postgres/entities/patient.entity';
import { Patient as PatientDocument } from '../../../infra/persistence/mongodb/schemas/patient.schema';

@Injectable()
export class RegisteredPatientConsumer {
  constructor(
    @Inject('PatientQueryRepository')
    private readonly patientMongoRepository: PatientQueryRepository,
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
  })
  public async handler(event: RegisteredPatientEventDto) {
    console.log(
      `Recebido evento de registro do paciente: ${JSON.stringify(event)}`,
    );
    console.log(`address: ${JSON.stringify(event.address)}`);
    console.log(`contact: ${JSON.stringify(event.contactInfo)}`);
    console.log(`documentation: ${JSON.stringify(event.documentation)}`);
    await this.patientMongoRepository.save(
      this.patientMapper.fromRegisteredEntityEventDtoToDocument(event),
    );
  }
}
