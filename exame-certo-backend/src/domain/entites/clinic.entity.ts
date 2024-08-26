import { Address } from "../value-objects/address.vo";
import { Doctor } from "./doctor.entity";
import { Patient } from "./patient.entity";
import { Exam } from "./exam.entity";
import { ContactInfo } from "../value-objects/contact-info.vo";
import { IHasher } from "../interfaces/hasher.interface";


export class Clinic {

  constructor(
   private readonly _id: string | null, // UUID
   private readonly _name: string,
   private readonly _email: string,
   private readonly _password: string,
   private readonly _address: Address,
   private readonly _contactInfo: ContactInfo,
   private readonly _doctors: Doctor[],
   private readonly _patients: Patient[],
   private readonly _exams: Exam[],
   private readonly _hashPassword: IHasher,
  ) { }

  get id(): string{
    return this._id;
  }

  get name(): string{
    return this._name;
  }

  get email(): string{
    return this._email;
  }

  get address(): Address{
    return this._address;
  }

  get contactInfo(): ContactInfo{
    return this._contactInfo;
  }

  get doctors(): Doctor[]{
    return [...this._doctors];
  }

  get patients(): Patient[]{
    return [...this._patients];
  }

  get exams(): Exam[]{
    return [...this._exams];
  }

  get password(): string{
    return this._password;
  }

  async verifyPassword(password: string): Promise<boolean> {
    return await this._hashPassword.compare(password, this._password);
  }

}
