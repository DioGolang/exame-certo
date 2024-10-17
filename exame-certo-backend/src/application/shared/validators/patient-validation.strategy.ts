import { Inject, Injectable } from '@nestjs/common';
import { UniqueValidationStrategy } from '../../interfaces/unique-validation-strategy.interface';
import { PatientQueryRepository } from '../../../domain/repositories/patient-query.repository';

@Injectable()
export class PatientValidationStrategy implements UniqueValidationStrategy {
  constructor(
    @Inject('PatientQueryRepository')
    private readonly patientReadRepository: PatientQueryRepository,
  ) {}

  async uniqueEmail(email: string): Promise<boolean> {
    return await this.patientReadRepository
      .findByEmail(email)
      .then((patient) => {
        return !patient;
      });
  }
}
