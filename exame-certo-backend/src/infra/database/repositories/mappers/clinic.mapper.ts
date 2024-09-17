import { ClinicEntity } from '../../postgres/entities/clinic.entity';
import { Clinic } from '../../../../domain/entities/clinic.entity';
import { Inject, Injectable } from '@nestjs/common';
import { BaseMapper } from './base.mapper';
import { BuilderFactory } from '../../../../domain/builders/builder.factory';
import { AddressMapper } from './address.mapper';
import { MapperUtils } from '../../../../shared/utils/mapper.utils';
import { AnamnesisEntity } from '../../postgres/entities/anamnesis.entity';
import { Anamnesis } from '../../../../domain/entities/anamnesis.entity';
import { PatientEntity } from '../../postgres/entities/patient.entity';
import { Patient } from '../../../../domain/entities/patient.entity';
import { DoctorEntity } from '../../postgres/entities/doctor.entity';
import { Doctor } from '../../../../domain/entities/doctor.entity';
import { ExamEntity } from '../../postgres/entities/exam.entity';
import { Exam } from '../../../../domain/entities/exam.entity';

@Injectable()
export class ClinicMapper extends BaseMapper<Clinic, ClinicEntity> {
  constructor(
    @Inject('BuilderFactory') builder: BuilderFactory,
    private readonly addressMapper: AddressMapper,
    // private readonly mapperFacade: MapperFacade,
  ) {
    super(builder);
  }

  public async toDomain(entity: ClinicEntity): Promise<Clinic> {
    const builder = await this.builder.createClinicBuilder(entity.id);
    const addressDto = this.addressMapper.toDto(entity.address);

    builder
      .withName(entity.name)
      .withEmail(entity.email)
      .withAddress(addressDto)
      .withContactInfo(entity.contactInfo);

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
    if (entity.patients) {
      const patientsArray = await MapperUtils.mapEntitiesToDomain<
        PatientEntity,
        Patient
      >(entity.patients, 'PatientMapper');
      builder.withPatients(patientsArray);
    }
    if (entity.doctors) {
      const doctorsArray = await MapperUtils.mapEntitiesToDomain<
        DoctorEntity,
        Doctor
      >(entity.doctors, 'DoctorMapper');
      builder.withDoctors(doctorsArray);
    }

    return builder.build();
  }

  public async toPersistence(domain: Clinic): Promise<ClinicEntity> {
    const entity = new ClinicEntity();
    // const { PatientMapper } = await import('./patient.mapper');
    // const { DoctorMapper } = await import('./doctor.mapper');
    // const { ExamMapper } = await import('./exam.mapper');
    // const { AnamnesisMapper } = await import('./anamnesis.mapper');
    BaseMapper.setCommonFieldsToPersistence(entity, domain);
    BaseMapper.setFieldsToPersistence(entity, domain, [
      'name',
      'email',
      'address',
      'contactInfo',
    ]);
    // entity.anamnesis = await Promise.all(
    //   domain.anamnesis.map(AnamnesisMapper.toPersistence),
    // );
    // entity.exams = await Promise.all(
    //   domain.exams.map(ExamMapper.toPersistence),
    // );
    // entity.doctors = await Promise.all(
    //   domain.doctors.map(DoctorMapper.toPersistence),
    // );
    // entity.patients = await Promise.all(
    //   domain.patients.map(PatientMapper.toPersistence),
    // );
    return entity;
  }
}
