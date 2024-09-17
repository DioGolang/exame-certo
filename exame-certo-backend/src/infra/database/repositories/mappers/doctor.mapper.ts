import { MapperUtils } from '../../../../shared/utils/mapper.utils';
import { DoctorEntity } from '../../postgres/entities/doctor.entity';
import { Doctor } from '../../../../domain/entities/doctor.entity';
import { BaseMapper } from './base.mapper';
import { Inject, Injectable } from '@nestjs/common';
import { BuilderFactory } from '../../../../domain/builders/builder.factory';
import { ExamEntity } from '../../postgres/entities/exam.entity';
import { Exam } from '../../../../domain/entities/exam.entity';
import { AnamnesisEntity } from '../../postgres/entities/anamnesis.entity';
import { Anamnesis } from '../../../../domain/entities/anamnesis.entity';
import { Report } from '../../../../domain/entities/report.entity';
import { ReportEntity } from '../../postgres/entities/report.entity';
import { ClinicEntity } from '../../postgres/entities/clinic.entity';
import { Clinic } from '../../../../domain/entities/clinic.entity';

@Injectable()
export class DoctorMapper extends BaseMapper<Doctor, DoctorEntity> {
  constructor(@Inject('BuilderFactory') builder: BuilderFactory) {
    super(builder);
  }
  public async toDomain(entity: DoctorEntity): Promise<Doctor> {
    const builder = await this.builder.createDoctorBuilder(entity.id);

    builder
      .withName(entity.name)
      .withEmail(entity.email)
      .withContactInfo(entity.contactInfo)
      .withProfessionalAddress(entity.professionalAddress)
      .withRegistrationNumber(entity.registrationNumber)
      .withSpecialization(entity.specialization);
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
    if (entity.reports) {
      const reportsArray = await MapperUtils.mapEntitiesToDomain<
        ReportEntity,
        Report
      >(entity.reports, 'ReportMapper');
      builder.withReport(reportsArray);
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

  public async toPersistence(domain: Doctor): Promise<DoctorEntity> {
    const entity = new DoctorEntity();
    BaseMapper.setCommonFieldsToPersistence(entity, domain);
    BaseMapper.setFieldsToPersistence(entity, domain, [
      'name',
      'email',
      'contactInfo',
      'professionalAddress',
      'registrationNumber',
      'specialization',
    ]);
    return entity;
  }
}
