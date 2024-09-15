import { PatientEntity } from '../../entities/patient.entity';
import { Patient } from '../../../../domain/entities/patient.entity';
import { MapperUtils } from '../../../../shared/utils/mapper.utils';
import { BaseMapper } from './base.mapper';
import { AddressMapper } from './address.mapper';
import { BuilderFactory } from '../../../../domain/builders/builder.factory';
import { Inject, Injectable } from '@nestjs/common';
import { DocumentationMapper } from './document.mapper';
import { Sex } from '../../../../domain/enums/sex.enum';
import { MaritalStatus } from '../../../../domain/enums/marital-status.enum';
import { ExamEntity } from '../../entities/exam.entity';
import { Exam } from '../../../../domain/entities/exam.entity';
import { ClinicEntity } from '../../entities/clinic.entity';
import { Clinic } from '../../../../domain/entities/clinic.entity';
import { AnamnesisEntity } from '../../entities/anamnesis.entity';
import { Anamnesis } from '../../../../domain/entities/anamnesis.entity';
import { AnamnesisMapper } from './anamnesis.mapper';
import { ExamMapper } from './exam.mapper';

@Injectable()
export class PatientMapper extends BaseMapper<Patient, PatientEntity> {
  constructor(
    @Inject('BuilderFactory') builder: BuilderFactory,
    private readonly addressMapper: AddressMapper,
    private readonly documentationMapper: DocumentationMapper,
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
    if (entity.healthInsurance) builder.withCreatedAt(entity.createdAt);
    if (entity.createdAt) builder.withCreatedAt(entity.createdAt);
    if (entity.updatedAt) builder.withUpdatedAt(entity.updatedAt);
    if (entity.anamnesis) {
      const anamnesisArray = await MapperUtils.mapEntitiesToDomain<
        AnamnesisEntity,
        Anamnesis
      >(entity.anamnesis, 'AnamnesisMapper');
      builder.withAnamnesis(anamnesisArray);
    }
    if (entity.exams) {
      const examArray = await MapperUtils.mapEntitiesToDomain<ExamEntity, Exam>(
        entity.exams,
        'ExamMapper',
      );
      builder.withExams(examArray);
    }
    if (entity.clinics) {
      const clinicArray = await MapperUtils.mapEntitiesToDomain<
        ClinicEntity,
        Clinic
      >(entity.clinics, 'ClinicMapper');
      builder.withClinics(clinicArray);
    }
    return builder.build();
  }

  public async toPersistence(domain: Patient): Promise<PatientEntity> {
    const entity = new PatientEntity();
    BaseMapper.setCommonFieldsToPersistence(entity, domain);
    entity.name = domain.name;
    entity.lastName = domain.lastName;
    entity.email = domain.email;
    entity.dateOfBirth = domain.dateOfBirth;
    entity.sex = domain.sex;
    entity.maritalStatus = domain.maritalStatus;
    entity.address = domain.address;
    entity.contactInfo = domain.contactInfo;
    entity.socioeconomicInformation = domain.socioeconomicInformation;
    entity.documentation = domain.documentation;
    entity.healthInsurance = domain.healthInsurance;

    entity.anamnesis = await Promise.all(
      domain.anamnesis.map(AnamnesisMapper.toPersistence),
    );
    entity.exams = await Promise.all(
      domain.exams.map(ExamMapper.toPersistence),
    );
    // entity.clinics = await Promise.all(
    //   domain.clinics.map(ClinicMapper.toPersistence),
    // );
    return entity;
  }
}
