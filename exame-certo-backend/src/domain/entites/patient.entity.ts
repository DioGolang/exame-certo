import { Address } from "../value-objects/address.vo";
import { SocioEconomicInformation } from "../value-objects/socio-economic-information.vo";
import { Sex } from "../enums/sex.enum";
import { ContactInfo } from "../value-objects/contact-info.vo";
import { MaritalStatus } from "../enums/marital-status.enum";
import { Documentation } from "../value-objects/documentation.vo";
import { IHasher } from "../interfaces/hasher.interface";

export class Patient{

  constructor(
    private readonly _id: string | null,
    private readonly _name: string,
    private readonly _lastName: string,
    private readonly _email: string,
    private readonly _password: string,
    private readonly _dateOfBirth: Date,
    private readonly _sex: Sex,
    private readonly _maritalStatus: MaritalStatus,
    private readonly _address: Address,
    private readonly _contactInfo: ContactInfo,
    private readonly _socioeconomicInformation: SocioEconomicInformation,
    private readonly _documentation: Documentation,
    private readonly _hashPassword: IHasher,
    private readonly _healthInsurance?: string,
  ) { }

}
