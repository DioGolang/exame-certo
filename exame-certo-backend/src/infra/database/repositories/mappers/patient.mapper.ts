import { PatientEntity } from '../../postgres/entities/patient.entity';
import { Patient } from '../../../../domain/entities/patient.entity';
import { BaseMapper } from './base.mapper';
import { BuilderFactory } from '../../../../domain/builders/builder.factory';
import { Inject, Injectable } from '@nestjs/common';
import { DocumentationMapper } from './document.mapper';
import { Sex } from '../../../../domain/enums/sex.enum';
import { MaritalStatus } from '../../../../domain/enums/marital-status.enum';
import { PatientMappingFactoryImpl } from './factory/patient-mapping.factory';

@Injectable()
export class PatientMapper extends BaseMapper<Patient, PatientEntity> {
  constructor(
    @Inject('BuilderFactory') builder: BuilderFactory,
    private readonly documentationMapper: DocumentationMapper,
    private readonly patientMappingFactory: PatientMappingFactoryImpl,
  ) {
    super(builder);
  }
  public async toDomain(entity: PatientEntity): Promise<Patient> {
    const builder = await this.builder.createPatientBuilder(entity.id);
    const documentationDto = this.documentationMapper.toDto(
      entity.documentation,
    );

    builder
      .withName(entity.name)
      .withLastName(entity.lastName)
      .withEmail(entity.email)
      .withDateOfBirth(entity.dateOfBirth)
      .withSex(entity.sex as Sex)
      .withMaritalStatus(entity.maritalStatus as MaritalStatus)
      .withAddress(entity.address)
      .withContactInfo(entity.contactInfo)
      .withDocumentation(documentationDto)
      .withSocioeconomicInformation(entity.socioeconomicInformation);

    if (entity.createdAt) builder.withCreatedAt(entity.createdAt);
    if (entity.updatedAt) builder.withUpdatedAt(entity.updatedAt);
    if (entity.healthInsurance)
      builder.withHealthInsurance(entity.healthInsurance);

    const { anamnesisArray, examArray, clinicArray } =
      await this.patientMappingFactory.mapRelationshipsToDomain(entity);

    builder
      .withAnamnesis(anamnesisArray)
      .withExams(examArray)
      .withClinics(clinicArray);

    return builder.build();
  }

  public async toPersistence(domain: Patient): Promise<PatientEntity> {
    const entity = new PatientEntity();
    BaseMapper.setCommonFieldsToPersistence(entity, domain);
    BaseMapper.setFieldsToPersistence(entity, domain, [
      'name',
      'lastName',
      'email',
      'dateOfBirth',
      'sex',
      'maritalStatus',
      'address',
      'contactInfo',
      'socioeconomicInformation',
      'documentation',
      'healthInsurance',
    ]);

    const { anamnesisEntities, examEntities, clinicEntities } =
      await this.patientMappingFactory.mapRelationshipsToPersistence(domain);

    entity.anamnesis = anamnesisEntities;
    entity.exams = examEntities;
    entity.clinics = clinicEntities;

    return entity;
  }
}
