import { Inject, Injectable } from '@nestjs/common';
import { Clinic } from '../../entities/clinic.entity';
import { PasswordHash } from '../../../application/interfaces/hasher.interface';
import { ClinicBuilder } from '../../builders/clinic.builder';
import { CreateClinicCommand } from '../../../application/clinic/commands/create-clinic.command';
import { UuidGenerator } from '../../interfaces/uuid-generator.interface';

@Injectable()
export class ClinicDomainService {
  constructor(
    @Inject('PasswordHash')
    private readonly passwordHash: PasswordHash,
    @Inject('UuidGenerator')
    private readonly uuidGeneratorService: UuidGenerator,
  ) {}

  async createClinic(
    clinicClinicCommand: CreateClinicCommand,
  ): Promise<Clinic> {
    const id = this.uuidGeneratorService.generate();
    const passwordHash = await this.passwordHash.hash(
      clinicClinicCommand.createClinicDto.password,
    );
    const clinicBuilder = new ClinicBuilder();
    return clinicBuilder
      .withId(id)
      .withPasswordHash(passwordHash)
      .withName(clinicClinicCommand.createClinicDto.name)
      .withEmail(clinicClinicCommand.createClinicDto.email)
      .withAddress(clinicClinicCommand.createClinicDto.address)
      .withContactInfo(clinicClinicCommand.createClinicDto.contactInfo)
      .withCreatedAt(new Date())
      .withUpdatedAt(new Date())
      .build();
  }
}
