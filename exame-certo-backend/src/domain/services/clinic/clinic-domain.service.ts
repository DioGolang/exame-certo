import { Inject, Injectable } from '@nestjs/common';
import { BuilderFactory } from '../../builders/builder.factory';
import { Clinic } from '../../entities/clinic.entity';
import { v4 as uuidv4 } from 'uuid';
import { PasswordHash } from '../../../application/interfaces/hasher.interface';
import { ClinicBuilder } from '../../builders/clinic.builder';
import { CreateClinicCommand } from '../../../application/clinic/commands/create-clinic.command';

@Injectable()
export class ClinicDomainService {
  constructor(
    @Inject('BuilderFactory')
    private readonly clinicBuilderFactory: BuilderFactory,
    @Inject('PasswordHash')
    private readonly passwordHash: PasswordHash,
  ) {}

  async createClinic(
    clinicClinicCommand: CreateClinicCommand,
  ): Promise<Clinic> {
    const id = uuidv4();
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
