import { GetDoctorQuery } from './get-doctor.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DoctorQueryRepository } from '../../../domain/repositories/doctor-query.repository';

@QueryHandler(GetDoctorQuery)
export class GetDoctorHandler implements IQueryHandler<GetDoctorQuery> {
  constructor(
    @Inject('DoctorQueryRepository')
    private readonly doctorReadRepository: DoctorQueryRepository,
  ) {}

  async execute(query: GetDoctorQuery): Promise<any> {
    const { doctorId } = query;
    return await this.doctorReadRepository.findById(doctorId);
  }
}
