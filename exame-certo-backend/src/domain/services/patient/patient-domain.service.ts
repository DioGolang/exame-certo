import { Inject, Injectable } from '@nestjs/common';
import { BuilderFactory } from '../../builders/builder.factory';
import { PasswordHash } from '../../../application/interfaces/hasher.interface';
import { CreatePatientCommand } from '../../../application/patient/commands/create-patient.command';
import { Patient } from '../../entities/patient.entity';
import { v4 as uuidv4 } from 'uuid';
import { PatientBuilder } from '../../builders/patient.builder';

@Injectable()
export class PatientDomainService {
  constructor(
    @Inject('BuilderFactory')
    private readonly clinicBuilderFactory: BuilderFactory,
    @Inject('PasswordHash')
    private readonly passwordHash: PasswordHash,
  ) {}

  async createPatient(
    createPatientCommand: CreatePatientCommand,
  ): Promise<Patient> {
    const id = uuidv4();
    const passwordHash = await this.passwordHash.hash(
      createPatientCommand.createPatientDto.password,
    );
    const patientBuilder = new PatientBuilder();
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
