import { Email } from "../../value-objects/email.vo";
import { Sex } from "../../enums/sex.enum";
import { MaritalStatus } from "../../enums/marital-status.enum";
import { Address } from "../../value-objects/address.vo";
import { ContactInfo } from "../../value-objects/contact-info.vo";
import { Documentation } from "../../value-objects/documentation.vo";
import { SocioEconomicInformation } from "../../value-objects/socio-economic-information.vo";


export interface PatientProps{
  name: string;
  lastName: string;
  email: Email;
  passwordHash: string;
  dateOfBirth: Date;
  sex: Sex;
  maritalStatus: MaritalStatus;
  address: Address;
  contactInfo: ContactInfo;
  documentation: Documentation;
  socioeconomicInformation: SocioEconomicInformation;
  healthInsurance?: string;
}