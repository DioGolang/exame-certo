import { Inject, Injectable } from '@nestjs/common';
import { UniqueValidationStrategy } from '../../interfaces/unique-validation-strategy.interface';
import { ClinicQueryRepository } from '../../../domain/repositories/clinic-query.repository';

@Injectable()
export class ClinicValidationStrategy implements UniqueValidationStrategy {
  constructor(
    @Inject('ClinicQueryRepository')
    private readonly clinicReadRepository: ClinicQueryRepository,
  ) {}

  async isUniqueEmail(email: string): Promise<boolean> {
    return await this.clinicReadRepository.findByEmail(email).then((clinic) => {
      return !clinic;
    });
  }
}
