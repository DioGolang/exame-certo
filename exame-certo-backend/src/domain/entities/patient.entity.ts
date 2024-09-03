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
import { InvalidPatientException } from "../exceptions/invalid-patient.exception";
import { PatientProps } from "../interfaces/props/patient-props.interface";

export class Patient{

  private readonly  _id: string;
  private readonly _passwordHash: string;
  private readonly _props: Readonly<PatientProps>;
  private readonly _anamnesis: Anamnesis[] = [];
  private readonly _exams: Exam[] = [];
  private readonly _clinics: Clinic[] = [];
  private readonly _doctors: Doctor[] = [];

  constructor(id: string, passwordHash: string, props: PatientProps) {
    this._id = id;
    this._passwordHash = passwordHash;
    this._props = {...props };
    this.validate()
  }


  // Methods to add elements to the collections
  // Generic methods for adding elements to collections
  private addToCollection<T>(collection: T[], item: T, checkFn: (item: T) => void): void {
    checkFn(item);
    collection.push(item);
  }

  // Add methods for specific collections
  public addAnamnesis(anamnesis: Anamnesis): void {
    this.addToCollection(this._anamnesis, anamnesis, this.checkAnamnesis.bind(this));
  }

  public addExam(exam: Exam): void {
    this.addToCollection(this._exams, exam, this.checkExam.bind(this));
  }

  // Similar methods for addDoctor, addClinic...

  // Validation for elements in collections
  private checkAnamnesis(anamnesis: Anamnesis): void {
    if (!anamnesis) throw new InvalidPatientException("Anamnesis is required");
    if (this._anamnesis.some(a => a.id === anamnesis.id)) {
      throw new InvalidPatientException("Anamnesis already added.");
    }
  }

  private checkExam(exam: Exam): void {
    if (!exam) throw new InvalidPatientException("Exam is required");
    if (this._exams.some(e => e.id === exam.id)) {
      throw new InvalidPatientException("Exam already added.");
    }
  }

  // Generic remove method for collections
  private removeFromCollection<T>(collection: T[], item: T, notFoundMessage: string): void {
    const index = collection.indexOf(item);
    if (index === -1) {
      throw new Error(notFoundMessage);
    }
    collection.splice(index, 1);
  }

  // Remove methods
  public removeAnamnesis(anamnesis: Anamnesis): void {
    this.removeFromCollection(this._anamnesis, anamnesis, 'Anamnesis not found');
  }

  public removeExam(exam: Exam): void {
    this.removeFromCollection(this._exams, exam, 'Exam not found');
  }

  // Similar methods for removeDoctor, removeClinic...

  // Methods to check if an item is associated
  public isAssociatedWith<T>(collection: T[], item: T): boolean {
    return collection.includes(item);
  }

  public isAssociatedWithDoctor(doctor: Doctor): boolean {
    return this.isAssociatedWith(this._doctors, doctor);
  }

  public isAssociatedWithClinic(clinic: Clinic): boolean {
    return this.isAssociatedWith(this._clinics, clinic);
  }


  // Validate method
  private validate(): void {
    const errors: string[] = [];
    this.checkField(this._props.name, "Name is required", errors);
    this.checkField(this._props.lastName, "Last name is required", errors);
    this.checkField(this._props.email.value, "Email is required", errors);
    this.checkPassword(this._props.passwordHash, errors);
    this.checkDateField(this._props.dateOfBirth, "Date of birth is required", errors);

    if (errors.length > 0) {
      throw new InvalidPatientException(errors.join("; "));
    }
  }

  // Utility validation methods
  private checkField(field: string, errorMessage: string, errors: string[]): void {
    if (!field || field.trim() === '') {
      errors.push(errorMessage);
    }
  }

  private checkDateField(field: Date, errorMessage: string, errors: string[]): void {
    if (!field) {
      errors.push(errorMessage);
    }
  }

  private checkPassword(password: string, errors: string[]): void {
    if (!password || password.trim() === '') {
      errors.push("Password is required");
    }
  }

  get id(): string {
    return this._id;
  }

  get passwordHash(): string {
    return this._passwordHash;
  }

  get name(): string {
    return this._props.name;
  }

  get lastName(): string {
    return this._props.lastName;
  }

  get email(): string {
    return this._props.email.value;
  }

  get dateOfBirth(): Date {
    return this._props.dateOfBirth;
  }

  get sex(): Sex {
    return this._props.sex;
  }

  get maritalStatus(): MaritalStatus {
    return this._props.maritalStatus;
  }

  get address(): Address {
    return this._props.address;
  }

  get contactInfo(): ContactInfo {
    return this._props.contactInfo;
  }

  get socioeconomicInformation(): SocioEconomicInformation {
    return this._props.socioeconomicInformation;
  }

  get documentation(): Documentation {
    return this._props.documentation;
  }

  get healthInsurance(): string | undefined {
    return this._props.healthInsurance;
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

}