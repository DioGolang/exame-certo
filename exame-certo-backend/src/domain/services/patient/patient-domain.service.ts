import { Inject, Injectable } from '@nestjs/common';
import { BuilderFactory } from '../../factories/build/builder.factory';
import { PasswordHash } from '../../../application/interfaces/hasher.interface';
import { RegisterPatientCommand } from '../../../application/patient/commands/register-patient.command';
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
    createPatientCommand: RegisterPatientCommand,
  ): Promise<Patient> {
    const id = this.uuidGeneratorService.generate();
    const passwordHash = await this.passwordHash.hash(
      createPatientCommand.registerPatientDto.password,
    );
    const patientBuilder = this.patientBuilderFactory.createBuilder();
    return patientBuilder
      .withId(id)
      .withPasswordHash(passwordHash)
      .withName(createPatientCommand.registerPatientDto.name)
      .withLastName(createPatientCommand.registerPatientDto.lastName)
      .withEmail(createPatientCommand.registerPatientDto.email)
      .withDateOfBirth(createPatientCommand.registerPatientDto.dateOfBirth)
      .withSex(createPatientCommand.registerPatientDto.sex)
      .withMaritalStatus(createPatientCommand.registerPatientDto.maritalStatus)
      .withDocumentation(createPatientCommand.registerPatientDto.documentation)
      .withSocioeconomicInformation(
        createPatientCommand.registerPatientDto.socioeconomicInformation,
      )
      .withAddress(createPatientCommand.registerPatientDto.address)
      .withContactInfo(createPatientCommand.registerPatientDto.contactInfo)
      .withHealthInsurance(
        createPatientCommand.registerPatientDto.healthInsurance,
      )
      .withCreatedAt(new Date())
      .withUpdatedAt(new Date())
      .build();
  }
}
