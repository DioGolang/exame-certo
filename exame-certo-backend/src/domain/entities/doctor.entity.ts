import { Clinic } from "./clinic.entity";
import { Anamnesis } from "./anamnesis.entity";
import { Exam } from "./exam.entity";
import { Report } from "./report.entity";
import { InvalidDoctorException } from "../exceptions/invalid-doctor.exception";
import { DoctorProps } from "../interfaces/props/doctor-props.interface";
import { ContactInfo } from "../value-objects/contact-info.vo";
import { Address } from "../value-objects/address.vo";

export class Doctor {

 private readonly _id: string;
 private readonly _passwordHash: string;
 private readonly _props: Readonly<DoctorProps>;

  private readonly _anamnesis: Anamnesis[] = [];
  private readonly _exams: Exam[] = [];
  private readonly _clinics: Clinic[] = [];
  private readonly _reports: Report[] = [];

 constructor(id: string, props: DoctorProps) {
  this._id = id;
  this._props = {...props};
  this.validate();
 }

  get id(): string{
   return this._id
  }

  get passwordHash(): string{
    return this._passwordHash
  }

  get name(): string{
   return this._props.name
  }

  get email(): string{
   return this._props.email.value
  }
// passwordHash, clinics
  get registrationNumber(): string{
   return this._props.registrationNumber
  }

  get specialization(): string{
   return this._props.specialization
  }

  get contactInfo(): ContactInfo{
   return this._props.contactInfo
  }

  get professionalAddress(): Address{
   return this._props.professionalAddress
  }

  get anamnesis(): Anamnesis[] {
   return this._anamnesis;
  }

 get exams(): Exam[] {
  return this._exams;
 }

 get reports(): Report[] {
  return this._reports;
 }

 get clinics(): Clinic[] {
  return this._clinics;
 }

  // async verifyPassword(password: string): Promise<boolean> {
  //   return await this._hashPassword.compare(password, this._password);
  // }



 //validate
 private checkField(field: string, errorMessage: string, errors: string[]): void {
  if (!field || field.trim() === '') {
   errors.push(errorMessage);
  }
 }

 private checkPassword(password: string, errors: string[]): void {
  if (!password || password.trim() === '') {
   errors.push("Password is required");
  }
 }

 private validate(): void {
  const errors: string[] = [];
  this.checkField(this._props.name, "Name is required", errors);
  this.checkPassword(this._passwordHash, errors);

  if (errors.length > 0 ){
   throw new InvalidDoctorException(errors.join("; "));
  }
 }


 // Methods for adding patients and clinics
 public addClinic(clinic: Clinic): void {
  if (!this._clinics.includes(clinic)) {
   this._clinics.push(clinic);
  }
 }




}
