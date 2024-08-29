import { Address } from "../value-objects/address.vo";
import { Clinic } from "./clinic.entity";
import { ContactInfo } from "../value-objects/contact-info.vo";
import { Anamnesis } from "./anamnesis.entity";
import { Exam } from "./exam.entity";
import { Patient } from "./patient.entity";
import { Report } from "./report.entity";
import { InvalidDoctorException } from "../exceptions/invalid-doctor.exception";

export class Doctor {

  private readonly _anamnesis: Anamnesis[] = [];
  private readonly _exams: Exam[] = [];
  private readonly _clinics: Clinic[] = [];
  private readonly _patients: Patient[] = [];
  private readonly _reports: Report[] = [];

 constructor(
   private _id: string | null,
   private readonly _name: string,
   private readonly _email: string,
   private readonly _passwordHash: string,
   private readonly _contactInfo: ContactInfo,
   private readonly _professionalAddress: Address,
   private readonly _registrationNumber: string,
   private readonly _specialization: string,
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
  this.checkField(this._name, "Name is required", errors);
  this.checkPassword(this._passwordHash, errors);

  if (errors.length > 0 ){
   throw new InvalidDoctorException(errors.join("; "));
  }
 }



 // Methods for adding patients and clinics
 public addPatient(patient: Patient): void {
  if (!this._patients.includes(patient)) {
   this._patients.push(patient);
  }
 }

 public addClinic(clinic: Clinic): void {
  if (!this._clinics.includes(clinic)) {
   this._clinics.push(clinic);
  }
 }




}
