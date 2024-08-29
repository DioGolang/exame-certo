import { Address } from "../value-objects/address.vo";
import { Doctor } from "./doctor.entity";
import { Patient } from "./patient.entity";
import { Exam } from "./exam.entity";
import { ContactInfo } from "../value-objects/contact-info.vo";
import { InvalidClinicException } from "../exceptions/invalid-clinic.exception";
import { Anamnesis } from "./anamnesis.entity";

export class Clinic {

  private readonly _id: string | null;

  private readonly _patients: Patient[] = [];
  private readonly _doctors: Doctor[] = [];
  private readonly _exams: Exam[] = [];
  private readonly _anamnesis: Anamnesis[] = [];

  constructor(
   id: string | null,
   private readonly _name: string,
   private readonly _email: string,
   private readonly _password: string,
   private readonly _address: Address,
   private readonly _contactInfo: ContactInfo,
  ) {
    this._id = id;
    this.validate();
  }

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

  get password(): string{
    return this._password;
  }

  //Methods for adding elements to collections
  public addPatient(patient: Patient): void {
    if (!this._patients.includes(patient)) {
      this._patients.push(patient);
    }
  }

  public addDoctor(doctor: Doctor): void {
    if (!this._doctors.includes(doctor)) {
      this._doctors.push(doctor);
    }
  }


  private validate(): void{
    const errors: string[] = [];

    this.checkField(this._name, "Name is required", errors);
    this.checkField(this._email, "Email is required", errors);
    this.checkField(this._password, "Password is required", errors);

    if (errors.length > 0 ){
      throw new InvalidClinicException(errors.join("; "));
    }
  }

  private checkField(field: string, errorMessage: string, errors: string[]): void{
    if(!field || field.trim() === ""){
      errors.push(errorMessage);
    }
  }

}
