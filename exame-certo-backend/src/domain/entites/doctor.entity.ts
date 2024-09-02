import { Clinic } from "./clinic.entity";
import { Anamnesis } from "./anamnesis.entity";
import { Exam } from "./exam.entity";
import { Report } from "./report.entity";
import { InvalidDoctorException } from "../exceptions/invalid-doctor.exception";
import { DoctorProps } from "../interfaces/props/doctor-props.interface";

export class Doctor {

 private readonly _id: string;
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

  get name(): string{
   return this._props.name
  }

  get email(): string{
   return this._props.email.value
  }

  get registrationNumber(): string{
   return this._props.registrationNumber
  }

  get specialization(): string{
   return this._props.specialization
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
  this.checkPassword(this._props.passwordHash, errors);

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
