import { Address } from '../value-objects/address.vo';
import { SocioEconomicInformation } from '../value-objects/socio-economic-information.vo';
import { Sex } from '../enums/sex.enum';
import { ContactInfo } from '../value-objects/contact-info.vo';
import { MaritalStatus } from '../enums/marital-status.enum';
import { Documentation } from '../value-objects/documentation.vo';
import { Anamnesis } from './anamnesis.entity';
import { Exam } from './exam.entity';
import { Clinic } from './clinic.entity';
import { Doctor } from './doctor.entity';
import { InvalidPatientException } from '../exceptions/invalid-patient.exception';
import { PatientProps } from '../interfaces/props/patient-props.interface';
import { PasswordHash } from '../../application/interfaces/hasher.interface';
import { ValidationUtils } from '../../shared/utils/validation.utils';
import { EntityUtils } from '../../shared/utils/entity.utils';

export class Patient {
  private readonly _id: string;
  private readonly _password: string;
  private readonly _props: Readonly<PatientProps>;
  private readonly _anamnesis: Anamnesis[] = [];
  private readonly _exams: Exam[] = [];
  private readonly _clinics: Clinic[] = [];
  private readonly _doctors: Doctor[] = [];

  constructor(id: string, props: PatientProps, passwordHash: string) {
    this._id = id;
    this._props = { ...props };
    this._password = passwordHash;
    this.validate();
  }

  async validatePassword(
    rawPassword: string,
    passwordHash: PasswordHash,
  ): Promise<boolean> {
    return await passwordHash.compare(rawPassword, this._password);
  }

  // Add methods for specific collections
  public addAnamnesis(anamnesis: Anamnesis): void {
    EntityUtils.addToCollection(this._anamnesis, anamnesis, (item) =>
      EntityUtils.checkDuplicate(
        item,
        this._anamnesis,
        'Anamnesis',
        InvalidPatientException,
      ),
    );
  }

  public addExam(exam: Exam): void {
    EntityUtils.addToCollection(this._exams, exam, (item) =>
      EntityUtils.checkDuplicate(
        item,
        this._exams,
        'Exam',
        InvalidPatientException,
      ),
    );
  }

  public addClinic(clinic: Clinic): void {
    EntityUtils.addToCollection(this._clinics, clinic, (item) =>
      EntityUtils.checkDuplicate(
        item,
        this._clinics,
        'Clinic',
        InvalidPatientException,
      ),
    );
  }

  public addDoctor(doctor: Doctor): void {
    EntityUtils.addToCollection(this._doctors, doctor, (item) =>
      EntityUtils.checkDuplicate(
        item,
        this._doctors,
        'Doctor',
        InvalidPatientException,
      ),
    );
  }

  // Remove methods
  public removeAnamnesis(anamnesis: Anamnesis): void {
    EntityUtils.removeFromCollection(
      this._anamnesis,
      anamnesis,
      InvalidPatientException,
      'Anamnesis not found',
    );
  }

  public removeExam(exam: Exam): void {
    EntityUtils.removeFromCollection(
      this._exams,
      exam,
      InvalidPatientException,
      'Exam not found',
    );
  }

  public removeClinic(clinic: Clinic): void {
    EntityUtils.removeFromCollection(
      this._clinics,
      clinic,
      InvalidPatientException,
      'Clinic not found',
    );
  }

  public removeDoctor(doctor: Doctor): void {
    EntityUtils.removeFromCollection(
      this._doctors,
      doctor,
      InvalidPatientException,
      'Doctor not found',
    );
  }

  // Methods to check if an item is associated
  public isAnamnesisAssociated(anamnesis: Anamnesis): boolean {
    return EntityUtils.isAssociatedWith(this._anamnesis, anamnesis);
  }

  public isExamAssociated(exam: Exam): boolean {
    return EntityUtils.isAssociatedWith(this._exams, exam);
  }

  public isClinicAssociated(clinic: Clinic): boolean {
    return EntityUtils.isAssociatedWith(this._clinics, clinic);
  }

  public isDoctorAssociated(doctor: Doctor): boolean {
    return EntityUtils.isAssociatedWith(this._doctors, doctor);
  }

  // Validate method
  private validate(): void {
    const errors: string[] = [];
    ValidationUtils.checkField(this._props.name, 'ID is required', errors);
    ValidationUtils.checkField(
      this._props.lastName,
      'Last name is required',
      errors,
    );
    ValidationUtils.checkField(
      this._props.email.value,
      'Email is required',
      errors,
    );
    ValidationUtils.checkDateField(
      this._props.dateOfBirth,
      'Date of birth is required',
      errors,
    );
    ValidationUtils.checkPassword(this._password, errors);

    if (errors.length > 0) {
      throw new InvalidPatientException(errors.join('; '));
    }
  }

  get id(): string {
    return this._id;
  }

  get passwordHash(): string {
    return this._password;
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

  get createdAt(): Date {
    return this._props.createdAt;
  }

  get updatedAt(): Date {
    return this._props.updatedAt;
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
