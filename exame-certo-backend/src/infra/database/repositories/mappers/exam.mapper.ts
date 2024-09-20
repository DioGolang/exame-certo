import { ExamEntity } from '../../postgres/entities/exam.entity';
import { Exam } from '../../../../domain/entities/exam.entity';
import { MapperUtils } from '../../../../shared/utils/mapper.utils';
import { BaseMapper } from './base.mapper';
import { ReportEntity } from '../../postgres/entities/report.entity';
import { Report } from '../../../../domain/entities/report.entity';
import { Inject, Injectable } from '@nestjs/common';
import { BuilderFactory } from '../../../../domain/builders/builder.factory';

@Injectable()
export class ExamMapper extends BaseMapper<Exam, ExamEntity> {
  constructor(@Inject('BuilderFactory') builder: BuilderFactory) {
    super(builder);
  }
  public async toDomain(entity: ExamEntity): Promise<Exam> {
    const builder = await this.builder.createExamBuilder(entity.id);
    builder
      .withDate(entity.date)
      .withType(entity.type)
      .withMethod(entity.method)
      .withValuesObtained(entity.valuesObtained)
      .withReferenceValues(entity.referenceValues)
      .withImages(entity.images)
      .withTUSSCode(entity.TUSSCode)
      .withCBHPMCode(entity.CBHPMCode)
      .withCIEFASCode(entity.CIEFASCode)
      .withClinicalHistory(entity.clinicalHistory)
      .withMainComplaint(entity.mainComplaint);
    if (entity.createdAt) builder.withCreatedAt(entity.createdAt);
    if (entity.updatedAt) builder.withUpdatedAt(entity.updatedAt);
    if (entity.reports) {
      const reportsArray = await MapperUtils.mapEntitiesToDomain<
        ReportEntity,
        Report
      >(entity.reports, 'ReportMapper');
      builder.withReports(reportsArray);
    }
    return builder.build();
  }

  public async toPersistence(domain: Exam): Promise<ExamEntity> {
    const entity = new ExamEntity();
    BaseMapper.setCommonFieldsToPersistence(entity, domain);
    BaseMapper.setFieldsToPersistence(entity, domain, [
      'date',
      'type',
      'method',
      'valuesObtained',
      'referenceValues',
      'images',
      'TUSSCode',
      'CBHPMCode',
      'CIEFASCode',
      'clinicalHistory',
      'mainComplaint',
    ]);
    return entity;
  }
}
