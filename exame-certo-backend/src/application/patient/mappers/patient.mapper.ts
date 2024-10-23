import { Inject, Injectable } from '@nestjs/common';
import { Patient as PatientDocument } from '../../../infra/persistence/mongodb/schemas/patient.schema';
import { Patient } from '../../../domain/entities/patient.entity';
import { RegisteredPatientEventDto } from '../dto/registered-patient-event.dto';
import { DocumentationMapper } from '../../shared/mappers/documentation.mapper';
import { PatientEntity } from '../../../infra/persistence/postgres/entities/patient.entity';
import { AddressMapper } from '../../shared/mappers/address.mapper';
import { PatientBuilder } from '../../../domain/builders/patient.builder';
import { BuilderFactory } from '../../../domain/factories/build/builder.factory';
import { PatientProps } from '../../../domain/interfaces/props/patient-props.interface';
import { PersistenceFactory } from '../../../domain/factories/persistence/persistence-factory.interface';
import { Mapper } from '../../interfaces/mapper.interface';
import { ContactInfoMapper } from '../../shared/mappers/contact-info.mapper';

@Injectable()
export class PatientMapper
  implements
    Mapper<Patient, PatientEntity, PatientDocument, RegisteredPatientEventDto>
{
  constructor(
    @Inject('PatientBuilderFactory')
    private readonly patientBuilderFactory: BuilderFactory<
      Patient,
      PatientProps,
      PatientBuilder
    >,
    @Inject('PatientPersistenceFactory')
    private readonly patientPersistenceFactory: PersistenceFactory<
      PatientEntity,
      PatientDocument,
      Patient
    >,
  ) {}

  toRegisteredDomainEventDto(patient: Patient): RegisteredPatientEventDto {
    return {
      id: patient.id,
      name: patient.name,
      lastName: patient.lastName,
      email: patient.email,
      passwordHash: patient['_passwordHash'],
      dateOfBirth: patient.dateOfBirth,
      sex: patient.sex,
      maritalStatus: patient.maritalStatus,
      documentation: DocumentationMapper.mapToDto(patient.documentation),
      socioeconomicInformation: patient.socioeconomicInformation,
      address: AddressMapper.toDto(patient.address),
      contactInfo: patient.contactInfo,
      healthInsurance: patient?.healthInsurance,
      createdAt: patient.createdAt,
      updatedAt: patient.updatedAt,
    };
  }

  fromEventDtoToDomain(dto: RegisteredPatientEventDto): Promise<Patient> {
    const patientBuilder = this.patientBuilderFactory.createBuilder();
    this.patientBuilderFactory.configureBuilder(patientBuilder, dto);
    return Promise.resolve(patientBuilder.build());
  }

  async toDomain(patientEntity: PatientEntity): Promise<Patient> {
    const patientBuild = this.patientBuilderFactory.createBuilder();
    this.patientBuilderFactory.configureBuilder(patientBuild, patientEntity);
    return patientBuild.build();
  }

  toPersistence(patient: Patient): PatientEntity {
    const patientEntity = this.patientPersistenceFactory.createEntity();
    this.patientPersistenceFactory.configurePersistence(patientEntity, patient);
    return patientEntity;
  }

  toDocument(patient: Patient): PatientDocument {
    const patientDocument = new PatientDocument();
    this.patientPersistenceFactory.configureDocument(patientDocument, patient);
    return patientDocument;
  }

  fromRegisteredEntityEventDtoToDocument(
    event: RegisteredPatientEventDto,
  ): PatientDocument {
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
    patient.address = AddressMapper.toDocument(event.address);
    patient.contactInfo = ContactInfoMapper.toDocument(event.contactInfo);
    patient.documentation = DocumentationMapper.fromDomain(event.documentation);
    patient.createdAt = event.createdAt;
    patient.updatedAt = event.updatedAt;
    return patient;
  }

  async documentForDomain(patientDocument: PatientDocument): Promise<Patient> {
    const patientBuilder = this.patientBuilderFactory.createBuilder();
    this.patientBuilderFactory.configureBuilder(
      patientBuilder,
      patientDocument,
    );
    return patientBuilder.build();
  }
}
