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

  async uniqueCpf(cpf: string): Promise<boolean> {
    return await this.patientReadRepository.findByCpf(cpf).then((patient) => {
      return !patient;
    });
  }
  async uniqueRg(rg: string): Promise<boolean> {
    return await this.patientReadRepository.findByRg(rg).then((patient) => {
      return !patient;
    });
  }

  async uniqueCns(cns: string): Promise<boolean> {
    return await this.patientReadRepository.findByCns(cns).then((patient) => {
      return !patient;
    });
  }

  async uniqueCnh(cnh: string): Promise<boolean> {
    return await this.patientReadRepository.findByCnh(cnh).then((patient) => {
      return !patient;
    });
  }
}
