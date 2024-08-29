import { Address } from "../value-objects/address.vo";
import { SocioEconomicInformation } from "../value-objects/socio-economic-information.vo";
import { Sex } from "../enums/sex.enum";
import { ContactInfo } from "../value-objects/contact-info.vo";
import { MaritalStatus } from "../enums/marital-status.enum";
import { Documentation } from "../value-objects/documentation.vo";
import { Anamnesis } from "./anamnesis.entity";
import { Exam } from "./exam.entity";
import { Clinic } from "./clinic.entity";
import { Doctor } from "./doctor.entity";

export class Patient{

  private readonly _anamnesis: Anamnesis[] = [];
  private readonly _exams: Exam[] = [];
  private readonly _clinics: Clinic[] = [];
  private readonly _doctors: Doctor[] = [];

  constructor(
    private _id: string | null,
    private readonly _tenantId: string,
    private readonly _name: string,
    private readonly _lastName: string,
    private readonly _email: string,
    private readonly _passwordHash: string,
    private readonly _dateOfBirth: Date,
    private readonly _sex: Sex,
    private readonly _maritalStatus: MaritalStatus,
    private readonly _address: Address,
    private readonly _contactInfo: ContactInfo,
    private readonly _socioeconomicInformation: SocioEconomicInformation,
    private readonly _documentation: Documentation,
    private readonly _healthInsurance?: string,
  ) {
    this.validate()
  }


  public setId(id: string): void {
    this._id = id;
  }

  //GETTERS
  get id(): string {
    if (!this._id) {
      throw new Error('ID is not set');
    }
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get lastName(): string {
    return this._lastName;
  }

  get email(): string {
    return this._email;
  }

  get dateOfBirth(): Date {
    return this._dateOfBirth;
  }

  get sex(): Sex {
    return this._sex;
  }

  get maritalStatus(): MaritalStatus {
    return this._maritalStatus;
  }

  get address(): Address {
    return this._address;
  }

  get contactInfo(): ContactInfo {
    return this._contactInfo;
  }

  get socioeconomicInformation(): SocioEconomicInformation {
    return this._socioeconomicInformation;
  }

  get documentation(): Documentation {
    return this._documentation;
  }

  get healthInsurance(): string | undefined {
    return this._healthInsurance;
  }

  //validate
  private validate() {
    if (!this._tenantId) throw new Error("Tenant ID is required");
    if (!this._name) throw new Error("Name is required");
    if (!this._email || !this._email.includes('@')) throw new Error("Valid email is required");
    // Additional validation logic here
  }

  // Methods to obtain the collections
   get anamnesis(): Anamnesis[] {
    return [...this._anamnesis];
  }

   get exams(): Exam[] {
    return [...this._exams];
  }

   get clinics(): Clinic[] {
    return [...this._clinics];
  }

   get doctors(): Doctor[] {
    return [...this._doctors];
  }

  // Methods to add elements to the collections
  public isAssociatedWithClinic(clinic: Clinic): boolean {
    return this._clinics.includes(clinic);
  }

}
