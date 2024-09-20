import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetClinicQuery } from '../get-clinic.query';
import { ClinicReadRepository } from '../../../domain/repositories/clinic-read.repository';

@QueryHandler(GetClinicQuery)
export class GetClinicHandler implements IQueryHandler<GetClinicQuery> {
  constructor(private readonly clinicReadRepository: ClinicReadRepository) {}

  async execute(query: GetClinicQuery): Promise<any> {
    // const { id } = query;
    // return await this.clinicReadRepository.findById(id);
  }
}
