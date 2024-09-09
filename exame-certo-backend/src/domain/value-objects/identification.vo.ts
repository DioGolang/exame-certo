import { Address } from './address.vo';
import { MaritalStatus } from '../enums/marital-status.enum';
import { Ethnicity } from '../enums/ethnicity.enum';
import { ContactInfo } from './contact-info.vo';
import { Sex } from '../enums/sex.enum';
import { EducationLevel } from '../enums/education-level.enum';
import { Naturalness } from '../enums/naturalness.enum';
import { Religion } from '../enums/religion.enum';

// Nome completo, idade, sexo, cor, nacionalidade e naturalidade, estado civil,
// profissão e endereço atual.
// Procedência (próxima e remota). Data do atendimento.

export class Identification {
  name: string;
  dateOfBirth: Date;
  sex: Sex;
  ethnicity: Ethnicity;
  maritalStatus: MaritalStatus;
  educationLevel: EducationLevel;
  religion: Religion;
  naturalness: Naturalness;
  profession: string;
  address: Address;
  contactInfo: ContactInfo;

  constructor(
    name: string,
    dateOfBirth: Date,
    sex: Sex,
    ethnicity: Ethnicity,
    educationLevel: EducationLevel,
    religion: Religion,
    naturalness: Naturalness,
    profession: string,
    maritalStatus: MaritalStatus,
    address: Address,
    contactInfo: ContactInfo,
  ) {
    this.name = name;
    this.dateOfBirth = dateOfBirth;
    this.sex = sex;
    this.ethnicity = ethnicity;
    this.educationLevel = educationLevel;
    this.religion = religion;
    this.naturalness = naturalness;
    this.profession = profession;
    this.maritalStatus = maritalStatus;
    this.address = address;
    this.contactInfo = contactInfo;
  }
}
