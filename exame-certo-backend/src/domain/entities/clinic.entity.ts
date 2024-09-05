import { Address } from "../value-objects/address.vo";
import { Doctor } from "./doctor.entity";
import { Patient } from "./patient.entity";
import { Exam } from "./exam.entity";
import { ContactInfo } from "../value-objects/contact-info.vo";
import { InvalidClinicException } from "../exceptions/invalid-clinic.exception";
import { Anamnesis } from "./anamnesis.entity";
import { ClinicProps } from "../interfaces/props/clinic-props.interface";

export class Clinic {

  private readonly _id: string;
  private readonly _props: Readonly<ClinicProps>;
  private readonly _patients: Patient[] = [];
  private readonly _doctors: Doctor[] = [];
  private readonly _exams: Exam[] = [];
  private readonly _anamnesis: Anamnesis[] = [];

  constructor(id: string, props: ClinicProps) {
    this._id = id;
    this._props = { ...props };
    this.validate();
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

    this.checkField(this._props.name, "Name is required", errors);
    this.checkField(this._props.email.value, "Email is required", errors);
    this.checkField(this._props.passwordHash, "Password is required", errors);

    if (errors.length > 0 ){
      throw new InvalidClinicException(errors.join("; "));
    }
  }

  private checkField(field: string, errorMessage: string, errors: string[]): void{
    if(!field || field.trim() === ""){
      errors.push(errorMessage);
    }
  }


  get id(): string{
    return this._id;
  }

  get name(): string{
    return this._props.name;
  }

  get email(): string{
    return this._props.email.value;
  }

  get address(): Address{
    return this._props.address;
  }

  get contactInfo(): ContactInfo{
    return this._props.contactInfo;
  }

  get password(): string{
    return this._props.passwordHash;
  }

}
