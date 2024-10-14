import { Inject, Injectable } from '@nestjs/common';
import { ClinicQueryRepository } from '../../../domain/repositories/clinic-query.repository';

@Injectable()
export class ValidationService {
  constructor(
    @Inject('ClinicQueryRepository')
    private readonly clinicReadRepository: ClinicQueryRepository,
  ) {}

  async emailUnique(email: string): Promise<boolean> {
    return await this.clinicReadRepository.findByEmail(email).then((clinic) => {
      return !clinic;
    });
  }
}
