import { Injectable } from '@nestjs/common';
import { BuilderFactory } from './builder.factory';
import { Patient } from '../../entities/patient.entity';
import { PatientProps } from '../../interfaces/props/patient-props.interface';
import { PatientBuilder } from '../../builders/patient.builder';
import { ContactInfoDto } from '../../../application/shared/dtos/contact-info.dto';
import { Sex } from '../../enums/sex.enum';
import { MaritalStatus } from '../../enums/marital-status.enum';
import { DocumentationDto } from '../../../application/shared/dtos/documentation.dto';
import { SocioEconomicInformationDto } from '../../../application/shared/dtos/socio-economic-information.dto';
import { AddressDto } from '../../../application/shared/dtos/address.dto';

interface PatientData {
  id: string;
  name: string;
  lastName: string;
  email: string;
  passwordHash: string;
  dateOfBirth: Date;
  sex: Sex;
  maritalStatus: MaritalStatus;
  socioeconomicInformation: SocioEconomicInformationDto;
  documentation: DocumentationDto;
  address: AddressDto;
  contactInfo: ContactInfoDto;
  createdAt: Date;
  updatedAt: Date;
  healthInsurance?: string;
}

@Injectable()
export class PatientFactory extends BuilderFactory<
  Patient,
  PatientProps,
  PatientBuilder
> {
  createBuilder(): PatientBuilder {
    return new PatientBuilder();
  }
  configureBuilder(builder: PatientBuilder, data: PatientData): PatientBuilder {
    return builder
      .withId(data.id)
      .withName(data.name)
      .withLastName(data.lastName)
      .withEmail(data.email)
      .withPasswordHash(data.passwordHash)
      .withSex(data.sex)
      .withMaritalStatus(data.maritalStatus)
      .withDocumentation(data.documentation)
      .withHealthInsurance(data.healthInsurance)
      .withDateOfBirth(data.dateOfBirth)
      .withSocioeconomicInformation(data.socioeconomicInformation)
      .withAddress(data.address)
      .withContactInfo(data.contactInfo)
      .withCreatedAt(data.createdAt)
      .withUpdatedAt(data.updatedAt);
  }
}
