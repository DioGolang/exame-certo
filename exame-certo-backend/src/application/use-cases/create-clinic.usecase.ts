import { Injectable } from '@nestjs/common';
import { ClinicRepository } from '../../domain/repositories/clinic.repository';
import { ClinicBuilder } from '../../domain/builders/clinic.builder';
import { CreateClinicCommand } from '../commands/create-clinic.command';

@Injectable()
export class CreateClinicUseCase {
  constructor(private readonly clinicRepository: ClinicRepository) {}

  async execute(command: CreateClinicCommand): Promise<void> {
    const clinic = await ClinicBuilder.create(command.createClinicDto.password)
      .withName(command.createClinicDto.name)
      .withEmail(command.createClinicDto.email)
      .withAddress(command.createClinicDto.address)
      .withContactInfo(command.createClinicDto.contactInfo)
      .build();
    await this.clinicRepository.save(clinic);
  }
}
