import { Inject, Injectable } from '@nestjs/common';
import { Patient as PatientDocument } from '../../../infra/persistence/mongodb/schemas/patient.schema';
import { Patient } from '../../../domain/entities/patient.entity';
import { CreatePatientEventDto } from '../dto/create-patient-event.dto';
import { DocumentationMapper } from '../../shared/mappers/documentation.mapper';
import { PatientEntity } from '../../../infra/persistence/postgres/entities/patient.entity';
import { AddressMapper } from '../../shared/mappers/address.mapper';
import { ContactInfoMapper } from '../../shared/mappers/contact-info.mapper';
import { PatientBuilder } from '../../../domain/builders/patient.builder';
import { BuilderFactory } from '../../../domain/builders/builder.factory';
import { PatientProps } from '../../../domain/interfaces/props/patient-props.interface';

@Injectable()
export class PatientMapper {
  constructor(
    @Inject('PatientBuilderFactory')
    private readonly patientBuilderFactory: BuilderFactory<
      Patient,
      PatientProps,
      PatientBuilder
    >,
  ) {}

  toCreatePatientEventDto(patient: Patient): CreatePatientEventDto {
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

  async toDomain(patientEntity: PatientEntity): Promise<Patient> {
    const patientBuild = this.patientBuilderFactory.createBuilder();
    this.patientBuilderFactory.configureBuilder(patientBuild, patientEntity);
    return patientBuild.build();
  }

  toPersistence(patient: Patient): PatientEntity {
    const patientEntity = new PatientEntity();
    patientEntity.id = patient.id;
    patientEntity.name = patient.name;
    patientEntity.lastName = patient.lastName;
    patientEntity.email = patient.email;
    patientEntity.password = patient.password;
    patientEntity.dateOfBirth = patient.dateOfBirth;
    patientEntity.sex = patient.sex;
    patientEntity.maritalStatus = patient.maritalStatus;
    patientEntity.documentation = patient.documentation;
    patientEntity.socioeconomicInformation = patient.socioeconomicInformation;
    patientEntity.address = patient.address;
    patientEntity.contactInfo = patient.contactInfo;
    patientEntity.healthInsurance = patient?.healthInsurance;
    patientEntity.createdAt = patient.createdAt;
    patientEntity.updatedAt = patient.updatedAt;
    return patientEntity;
  }

  toDocument(patient: Patient): PatientDocument {
    const patientDocument = new PatientDocument();
    patientDocument.id = patient.id;
    patientDocument.name = patient.name;
    patientDocument.lastName = patient.lastName;
    patientDocument.email = patient.email;
    patientDocument.passwordHash = patient.password;
    patientDocument.dateOfBirth = patient.dateOfBirth;
    patientDocument.sex = patient.sex;
    patientDocument.maritalStatus = patient.maritalStatus;
    patientDocument.documentation = patient.documentation;
    patientDocument.socioeconomicInformation = patient.socioeconomicInformation;
    patientDocument.address = AddressMapper.toDocument(patient.address);
    patientDocument.contactInfo = ContactInfoMapper.toDocument(
      patient.contactInfo,
    );
    patientDocument.createdAt = patient.createdAt;
    patientDocument.updatedAt = patient.updatedAt;
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
