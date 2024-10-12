import { Inject, Injectable } from '@nestjs/common';
import { BuilderFactory } from '../../factories/build/builder.factory';
import { PasswordHash } from '../../../application/interfaces/hasher.interface';
import { CreatePatientCommand } from '../../../application/patient/commands/create-patient.command';
import { Patient } from '../../entities/patient.entity';
import { PatientBuilder } from '../../builders/patient.builder';
import { UuidGenerator } from '../../interfaces/uuid-generator.interface';
import { PatientProps } from '../../interfaces/props/patient-props.interface';

@Injectable()
export class PatientDomainService {
  constructor(
    @Inject('PatientBuilderFactory')
    private readonly patientBuilderFactory: BuilderFactory<
      Patient,
      PatientProps,
      PatientBuilder
    >,
    @Inject('PasswordHash')
    private readonly passwordHash: PasswordHash,
    @Inject('UuidGenerator')
    private readonly uuidGeneratorService: UuidGenerator,
  ) {}

  async createPatient(
    createPatientCommand: CreatePatientCommand,
  ): Promise<Patient> {
    const id = this.uuidGeneratorService.generate();
    const passwordHash = await this.passwordHash.hash(
      createPatientCommand.createPatientDto.password,
    );
    const patientBuilder = this.patientBuilderFactory.createBuilder();
    return patientBuilder
      .withId(id)
      .withPasswordHash(passwordHash)
      .withName(createPatientCommand.createPatientDto.name)
      .withLastName(createPatientCommand.createPatientDto.lastName)
      .withEmail(createPatientCommand.createPatientDto.email)
      .withDateOfBirth(createPatientCommand.createPatientDto.dateOfBirth)
      .withSex(createPatientCommand.createPatientDto.sex)
      .withMaritalStatus(createPatientCommand.createPatientDto.maritalStatus)
      .withDocumentation(createPatientCommand.createPatientDto.documentation)
      .withSocioeconomicInformation(
        createPatientCommand.createPatientDto.socioeconomicInformation,
      )
      .withAddress(createPatientCommand.createPatientDto.address)
      .withContactInfo(createPatientCommand.createPatientDto.contactInfo)
      .withHealthInsurance(
        createPatientCommand.createPatientDto.healthInsurance,
      )
      .withCreatedAt(new Date())
      .withUpdatedAt(new Date())
      .build();
  }
}
