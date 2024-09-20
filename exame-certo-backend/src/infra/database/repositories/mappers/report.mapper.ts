import { ReportEntity } from '../../postgres/entities/report.entity';
import { Report } from '../../../../domain/entities/report.entity';
import { BaseMapper } from './base.mapper';
import { Inject, Injectable } from '@nestjs/common';
import { BuilderFactory } from '../../../../domain/builders/builder.factory';

@Injectable()
export class ReportMapper extends BaseMapper<Report, ReportEntity> {
  constructor(@Inject('BuilderFactory') builder: BuilderFactory) {
    super(builder);
  }
  public async toDomain(entity: ReportEntity): Promise<Report> {
    const builder = await this.builder.createReportBuilder(entity.id);
    builder
      // .withDoctor(await DoctorMapper.toDomain(entity.doctor))
      .withDate(entity.date)
      .withDiagnosis(entity.diagnosis)
      .withCID10(entity.CID10)
      .withJustification(entity.justification)
      .withConduct(entity.conduct)
      .withHypothesis(entity.hypothesis)
      .withAdditionalInformation(entity.additionalInformation)
      .withSignature(entity.signature)
      .withPrognosis(entity.prognosis)
      .withRestStartDate(entity.restStartDate)
      .withRestDuration(entity.restDuration)
      .withTherapeuticConduct(entity.therapeuticConduct)
      .withClinicalEvolution(entity.clinicalEvolution)
      .withHealthConsequences(entity.healthConsequences)
      .withConsultationReason(entity.consultationReason)
      .withIllnessHistory(entity.illnessHistory);
    if (entity.createdAt) builder.withCreatedAt(entity.createdAt);
    if (entity.updatedAt) builder.withUpdatedAt(entity.updatedAt);
    // if (entity.exams) {
    //   const examArray = await MapperUtils.mapEntitiesToDomain<ExamEntity, Exam>(
    //     entity.exams,
    //     'ExamMapper',
    //   );
    //   builder.withExams(examArray);
    // }
    return builder.build();
  }

  public async toPersistence(domain: Report): Promise<ReportEntity> {
    const entity = new ReportEntity();
    BaseMapper.setCommonFieldsToPersistence(entity, domain);
    BaseMapper.setFieldsToPersistence(entity, domain, [
      'date',
      'diagnosis',
      'CID10',
      'justification',
      'conduct',
      'hypothesis',
      'additionalInformation',
      'signature',
      'prognosis',
      'restStartDate',
      'restDuration',
      'therapeuticConduct',
      'clinicalEvolution',
      'healthConsequences',
      'consultationReason',
      'illnessHistory',
    ]);
    return entity;
  }
}
