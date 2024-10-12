import { Inject, Injectable } from '@nestjs/common';
import { Patient as PatientDocument } from '../../../infra/persistence/mongodb/schemas/patient.schema';
import { Patient } from '../../../domain/entities/patient.entity';
import { CreatePatientEventDto } from '../dto/create-patient-event.dto';
import { DocumentationMapper } from '../../shared/mappers/documentation.mapper';
import { PatientEntity } from '../../../infra/persistence/postgres/entities/patient.entity';
import { AddressMapper } from '../../shared/mappers/address.mapper';
import { PatientBuilder } from '../../../domain/builders/patient.builder';
import { BuilderFactory } from '../../../domain/factories/build/builder.factory';
import { PatientProps } from '../../../domain/interfaces/props/patient-props.interface';
import { PersistenceFactory } from '../../../domain/factories/persistence/persistence-factory.interface';
import { Mapper } from '../../interfaces/mapper.interface';

@Injectable()
export class PatientMapper
  implements
    Mapper<Patient, PatientEntity, PatientDocument, CreatePatientEventDto>
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

  toCreateDomainEventDto(patient: Patient): CreatePatientEventDto {
    return {
      id: patient.id,
      name: patient.name,
      lastName: patient.lastName,
      email: patient.email,
      password: patient.password,
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

  fromEventDtoToDomain(dto: CreatePatientEventDto): Promise<Patient> {
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

  async documentForDomain(patientDocument: PatientDocument): Promise<Patient> {
    const patientBuilder = this.patientBuilderFactory.createBuilder();
    this.patientBuilderFactory.configureBuilder(
      patientBuilder,
      patientDocument,
    );
    return patientBuilder.build();
  }
}
