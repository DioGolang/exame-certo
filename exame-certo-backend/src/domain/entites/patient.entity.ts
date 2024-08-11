import { CPF } from "../value-objects/cpf.vo";
import { Address } from "../value-objects/address.vo";
import { SocioEconomicInformation } from "../value-objects/socio-economic-information.vo";
import { Sex } from "../enums/sex.enum";
import { ContactInfo } from "../value-objects/contact-info.vo";


export class Patient{
  id: string;
  name: string;
  dateOfBirth: Date;
  sex: Sex;
  maritalStatus: string;
  address: Address;
  contactInfo: ContactInfo;
  identificationNumber: CPF;
  socioeconomicInformation: SocioEconomicInformation;
  cnsNumber?: string;
  healthInsurance?: string;
}