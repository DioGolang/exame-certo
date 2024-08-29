import { Address } from "../value-objects/address.vo";
import { Clinic } from "./clinic.entity";
import { ContactInfo } from "../value-objects/contact-info.vo";
import { IHasher } from "../interfaces/hasher.interface";
import { Anamnesis } from "./anamnesis.entity";
import { Exam } from "./exam.entity";
import { Patient } from "./patient.entity";
import { Report } from "./report.entity";

export class Doctor {

 constructor(
   private readonly  _id: string | null, // UUID
   private readonly _tenantId: string,
   private readonly _name: string,
   private readonly _email: string,
   private readonly _password: string,
   private readonly _contactInfo: ContactInfo,
   private readonly _professionalAddress: Address,
   private readonly _registrationNumber: string,
   private readonly _specialization: string,
   private readonly _anamnesis: Anamnesis[],
   private readonly _exams: Exam[],
   private readonly _reports: Report[],
   private readonly _patients: Patient[],
   private readonly _clinics: Clinic[],
   private readonly _hashPassword: IHasher,
 ) { }

  get id(): string{
   return this._id
  }

  get name(): string{
   return this._name
  }

  get email(): string{
   return this._email
  }

  get registrationNumber(): string{
   return this._registrationNumber
  }

  get specialization(): string{
   return this._specialization
  }

  async verifyPassword(password: string): Promise<boolean> {
    return await this._hashPassword.compare(password, this._password);
  }


  // isAssociatedWithClinic

}
