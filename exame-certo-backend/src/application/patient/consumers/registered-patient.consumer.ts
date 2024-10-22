import { Inject, Injectable } from '@nestjs/common';
import { PatientQueryRepository } from '../../../domain/repositories/patient-query.repository';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RegisteredPatientEventDto } from '../dto/registered-patient-event.dto';
import { Patient as PatientDocument } from '../../../infra/persistence/mongodb/schemas/patient.schema';
import { AddressMapper } from '../../shared/mappers/address.mapper';
import { ContactInfoMapper } from '../../shared/mappers/contact-info.mapper';
import { DocumentationMapper } from '../../shared/mappers/documentation.mapper';

@Injectable()
export class RegisteredPatientConsumer {
  constructor(
    @Inject('PatientQueryRepository')
    private readonly patientMongoRepository: PatientQueryRepository,
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
    const patient = new PatientDocument();
    patient.id = event.id;
    patient.name = event.name;
    patient.lastName = event.lastName;
    patient.email = event.email;
    patient.passwordHash = event.passwordHash;
    patient.dateOfBirth = event.dateOfBirth;
    patient.sex = event.sex;
    patient.maritalStatus = event.maritalStatus;
    patient.socioeconomicInformation = event.socioeconomicInformation;
    patient.documentation = DocumentationMapper.fromDomain(event.documentation);
    patient.address = AddressMapper.toDocument(event.address);
    patient.contactInfo = ContactInfoMapper.toDocument(event.contactInfo);
    patient.createdAt = event.createdAt;
    patient.updatedAt = event.updatedAt;

    await this.patientMongoRepository.save(patient);
  }
}
