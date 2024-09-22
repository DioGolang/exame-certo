import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetClinicQuery } from './get-clinic.query';
import { ClinicQueryRepository } from '../../../domain/repositories/clinic-query.repository';
import { Inject } from '@nestjs/common';

@QueryHandler(GetClinicQuery)
export class GetClinicHandler implements IQueryHandler<GetClinicQuery> {
  constructor(
    @Inject('ClinicQueryRepository')
    private readonly clinicReadRepository: ClinicQueryRepository,
  ) {}

  async execute(query: GetClinicQuery): Promise<any> {
    const { clinicId } = query;
    return await this.clinicReadRepository.findById(clinicId);
  }
}
