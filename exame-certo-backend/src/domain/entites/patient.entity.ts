import { CPF } from "../value-objects/cpf.vo";
import { Address } from "../value-objects/address.vo";
import { SocioEconomicInformation } from "../value-objects/socio-economic-information.vo";


export class Patient{
  id: string;
  name: string;
  dateOfBirth: Date;
  sex: string;
  maritalStatus: string;
  address: Address;
  phone: string;
  email: string;
  identificationNumber: CPF;
  healthInsurance?: string;
  socioeconomicInformation: SocioEconomicInformation;
}