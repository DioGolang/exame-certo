import { Clinic } from './clinic.entity';
import { Anamnesis } from './anamnesis.entity';
import { Exam } from './exam.entity';
import { Report } from './report.entity';
import { InvalidDoctorException } from '../exceptions/invalid-doctor.exception';
import { DoctorProps } from '../interfaces/props/doctor-props.interface';
import { ContactInfo } from '../value-objects/contact-info.vo';
import { Address } from '../value-objects/address.vo';
import { PasswordHash } from '../../application/interfaces/hasher.interface';
import { ValidationUtils } from '../../shared/utils/validation.utils';
import { EntityUtils } from '../../shared/utils/entity.utils';

export class Doctor {
  private readonly _id: string;
  private readonly _password: string;
  private _props: Readonly<DoctorProps>;
  private _anamnesis: Anamnesis[] = [];
  private _exams: Exam[] = [];
  private _clinics: Clinic[] = [];
  private _reports: Report[] = [];

  constructor(id: string, props: DoctorProps, passwordHash: string) {
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

  //validate

  private validate(): void {
    const errors: string[] = [];
    ValidationUtils.checkField(this._props.name, 'Name is required', errors);
    ValidationUtils.checkPassword(this._password, errors);

    if (errors.length > 0) {
      throw new InvalidDoctorException(errors.join('; '));
    }
  }

  // Methods for adding patients and clinics
  public addClinic(clinic: Clinic): void {
    EntityUtils.addToCollection(this._clinics, clinic, (item) =>
      EntityUtils.checkDuplicate(
        item,
        this._clinics,
        'Clinic',
        InvalidDoctorException,
      ),
    );
  }

  public addAnamnesis(anamnesis: Anamnesis): void {
    EntityUtils.addToCollection(this._anamnesis, anamnesis, (item) =>
      EntityUtils.checkDuplicate(
        item,
        this._anamnesis,
        'Anamnesis',
        InvalidDoctorException,
      ),
    );
  }

  public addExam(exam: Exam): void {
    EntityUtils.addToCollection(this._exams, exam, (item) =>
      EntityUtils.checkDuplicate(
        item,
        this._exams,
        'Exam',
        InvalidDoctorException,
      ),
    );
  }

  public addReport(report: Report): void {
    EntityUtils.addToCollection(this._reports, report, (item) =>
      EntityUtils.checkDuplicate(
        item,
        this._reports,
        'Report',
        InvalidDoctorException,
      ),
    );
  }

  // Remove methods
  public removeClinic(clinic: Clinic): void {
    EntityUtils.removeFromCollection(
      this._clinics,
      clinic,
      InvalidDoctorException,
      'Clinic not found',
    );
  }

  public removeAnamnesis(anamnesis: Anamnesis): void {
    EntityUtils.removeFromCollection(
      this._anamnesis,
      anamnesis,
      InvalidDoctorException,
      'Anamnesis not found',
    );
  }

  public removeExam(exam: Exam): void {
    EntityUtils.removeFromCollection(
      this._exams,
      exam,
      InvalidDoctorException,
      'Exam not found',
    );
  }

  public removeReport(report: Report): void {
    EntityUtils.removeFromCollection(
      this._reports,
      report,
      InvalidDoctorException,
      'Report not found',
    );
  }

  get id(): string {
    return this._id;
  }

  get password(): string {
    return this._password;
  }

  get name(): string {
    return this._props.name;
  }

  get email(): string {
    return this._props.email.value;
  }
  // password, clinics
  get registrationNumber(): string {
    return this._props.registrationNumber;
  }

  get specialization(): string {
    return this._props.specialization;
  }

  get contactInfo(): ContactInfo {
    return this._props.contactInfo;
  }

  get address(): Address {
    return this._props.address;
  }

  get createdAt(): Date {
    return this._props.createdAt;
  }

  get updatedAt(): Date {
    return this._props.updatedAt;
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
}
