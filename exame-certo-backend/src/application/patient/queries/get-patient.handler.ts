import { GetPatientQuery } from './get-patient.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PatientQueryRepository } from '../../../domain/repositories/patient-query.repository';

@QueryHandler(GetPatientQuery)
export class GetPatientHandler implements IQueryHandler<GetPatientQuery> {
  constructor(
    @Inject('PatientQueryRepository')
    private readonly patientReadRepository: PatientQueryRepository,
  ) {}

  async execute(query: GetPatientQuery): Promise<any> {
    const { patientId } = query;
    return await this.patientReadRepository.findById(patientId);
  }
}
