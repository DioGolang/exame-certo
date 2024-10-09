import { Inject, Injectable } from '@nestjs/common';
import { BuilderFactory } from '../../builders/builder.factory';
import { PasswordHash } from '../../../application/interfaces/hasher.interface';
import { Doctor } from '../../entities/doctor.entity';
import { CreateDoctorCommand } from '../../../application/doctor/commands/create-doctor.command';
import { DoctorBuilder } from '../../builders/doctor.builder';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DoctorDomainService {
  constructor(
    @Inject('BuilderFactory')
    private readonly doctorBuilderFactory: BuilderFactory,
    @Inject('PasswordHash')
    private readonly passwordHash: PasswordHash,
  ) {}

  async createDoctor(
    createDoctorCommand: CreateDoctorCommand,
  ): Promise<Doctor> {
    const id = uuidv4();
    const passwordHash = await this.passwordHash.hash(
      createDoctorCommand.createDoctorDto.password,
    );
    const doctorBuilder = new DoctorBuilder();
    return doctorBuilder
      .withId(id)
      .withPasswordHash(passwordHash)
      .withName(createDoctorCommand.createDoctorDto.name)
      .withEmail(createDoctorCommand.createDoctorDto.email)
      .withPasswordHash(createDoctorCommand.createDoctorDto.password)
      .withAddress(createDoctorCommand.createDoctorDto.address)
      .withContactInfo(createDoctorCommand.createDoctorDto.contactInfo)
      .withRegistrationNumber(
        createDoctorCommand.createDoctorDto.registrationNumber,
      )
      .withSpecialization(createDoctorCommand.createDoctorDto.specialization)
      .withCreatedAt(new Date())
      .withUpdatedAt(new Date())
      .build();
  }
}
