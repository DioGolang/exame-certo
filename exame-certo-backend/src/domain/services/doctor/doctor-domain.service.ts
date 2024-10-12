import { Inject, Injectable } from '@nestjs/common';
import { BuilderFactory } from '../../factories/build/builder.factory';
import { PasswordHash } from '../../../application/interfaces/hasher.interface';
import { Doctor } from '../../entities/doctor.entity';
import { CreateDoctorCommand } from '../../../application/doctor/commands/create-doctor.command';
import { DoctorBuilder } from '../../builders/doctor.builder';
import { UuidGenerator } from '../../interfaces/uuid-generator.interface';
import { DoctorProps } from '../../interfaces/props/doctor-props.interface';

@Injectable()
export class DoctorDomainService {
  constructor(
    @Inject('DoctorBuilderFactory')
    private readonly doctorBuilderFactory: BuilderFactory<
      Doctor,
      DoctorProps,
      DoctorBuilder
    >,
    @Inject('PasswordHash')
    private readonly passwordHash: PasswordHash,
    @Inject('UuidGenerator')
    private readonly uuidGeneratorService: UuidGenerator,
  ) {}

  async createDoctor(
    createDoctorCommand: CreateDoctorCommand,
  ): Promise<Doctor> {
    const id = this.uuidGeneratorService.generate();
    const passwordHash = await this.passwordHash.hash(
      createDoctorCommand.createDoctorDto.password,
    );
    const doctorBuilder = this.doctorBuilderFactory.createBuilder();
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
