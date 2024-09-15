import { ExamEntity } from '../../entities/exam.entity';
import { Exam } from '../../../../domain/entities/exam.entity';
import { MapperUtils } from '../../../../shared/utils/mapper.utils';
import { BaseMapper } from './base.mapper';
import { ReportEntity } from '../../entities/report.entity';
import { Report } from '../../../../domain/entities/report.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExamMapper extends BaseMapper<Exam, ExamEntity> {
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
