import { UniqueValidationStrategy } from '../../interfaces/unique-validation-strategy.interface';
import { Inject, Injectable } from '@nestjs/common';
import { DoctorQueryRepository } from '../../../domain/repositories/doctor-query.repository';

@Injectable()
export class DoctorValidationStrategy implements UniqueValidationStrategy {
  constructor(
    @Inject('DoctorQueryRepository')
    private readonly doctorReadRepository: DoctorQueryRepository,
  ) {}

  async uniqueEmail(email: string): Promise<boolean> {
    return await this.doctorReadRepository.findByEmail(email).then((doctor) => {
      return !doctor;
    });
  }
}
