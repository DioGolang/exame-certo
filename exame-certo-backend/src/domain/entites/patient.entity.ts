import { Address } from "../value-objects/address.vo";
import { SocioEconomicInformation } from "../value-objects/socio-economic-information.vo";
import { Sex } from "../enums/sex.enum";
import { ContactInfo } from "../value-objects/contact-info.vo";
import { MaritalStatus } from "../enums/marital-status.enum";
import { Documentation } from "../value-objects/documentation.vo";
import { IHasher } from "../interfaces/hasher.interface";
import { Anamnesis } from "./anamnesis.entity";
import { Exam } from "./exam.entity";
import { Clinic } from "./clinic.entity";
import { Doctor } from "./doctor.entity";

export class Patient{

  constructor(
    private readonly _id: string | null,
    private readonly _tenantId: string,
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
    private readonly _anamnesis: Anamnesis[],
    private readonly _exams: Exam[],
    private readonly _clinics: Clinic[],
    private readonly _doctors: Doctor[],
    private readonly _healthInsurance?: string,
  ) { }

  get id(): string{
    return this._id;
  }

  get name(): string{
    return this._name;
  }

  get lastName(): string{
    return this._lastName;
  }

  get email(): string{
    return this._email
  }

  get dateOfBirth(): Date{
    return this._dateOfBirth;
  }

  get sex(): Sex{
    return this._sex;
  }

  get maritalStatus(): MaritalStatus{
    return this._maritalStatus;
  }

  async verifyPassword(password: string): Promise<boolean> {
    return await this._hashPassword.compare(password, this._password);
  }

}
