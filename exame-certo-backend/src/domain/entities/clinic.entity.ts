import { Address } from '../value-objects/address.vo';
import { Doctor } from './doctor.entity';
import { Patient } from './patient.entity';
import { Exam } from './exam.entity';
import { ContactInfo } from '../value-objects/contact-info.vo';
import { InvalidClinicException } from '../exceptions/invalid-clinic.exception';
import { Anamnesis } from './anamnesis.entity';
import { ClinicProps } from '../interfaces/props/clinic-props.interface';
import { PasswordHash } from '../../application/interfaces/hasher.interface';
import { ValidationUtils } from '../../shared/utils/validation.utils';
import { EntityUtils } from '../../shared/utils/entity.utils';

export class Clinic {
  private readonly _id: string;
  private readonly _passwordHash: string;
  private readonly _props: Readonly<ClinicProps>;
  private readonly _patients: Patient[] = [];
  private readonly _doctors: Doctor[] = [];
  private readonly _exams: Exam[] = [];
  private readonly _anamnesis: Anamnesis[] = [];

  constructor(id: string, props: ClinicProps, passwordHash: string) {
    this._id = id;
    this._props = { ...props };
    this._passwordHash = passwordHash;
    this.validate();
  }

  async validatePassword(
    rawPassword: string,
    passwordHash: PasswordHash,
  ): Promise<boolean> {
    return await passwordHash.compare(rawPassword, this._passwordHash);
  }

  private validate(): void {
    const errors: string[] = [];
    ValidationUtils.checkField(this._props.name, 'Name is required', errors);
    ValidationUtils.checkField(
      this._props.email.value,
      'Email is required',
      errors,
    );
    ValidationUtils.checkField(
      this._passwordHash,
      'Password is required',
      errors,
    );

    if (errors.length > 0) {
      throw new InvalidClinicException(errors.join('; '));
    }
  }

  public addAnamnesis(anamnesis: Anamnesis): void {
    EntityUtils.addToCollection(this._anamnesis, anamnesis, (item) =>
      EntityUtils.checkDuplicate(
        item,
        this._anamnesis,
        'Anamnesis',
        InvalidClinicException,
      ),
    );
  }

  public addExam(exam: Exam): void {
    EntityUtils.addToCollection(this._exams, exam, (item) =>
      EntityUtils.checkDuplicate(
        item,
        this._exams,
        'Exam',
        InvalidClinicException,
      ),
    );
  }

  public addPatient(patient: Patient): void {
    EntityUtils.addToCollection(this._patients, patient, (item) =>
      EntityUtils.checkDuplicate(
        item,
        this._patients,
        'Patient',
        InvalidClinicException,
      ),
    );
  }

  public addDoctor(doctor: Doctor): void {
    EntityUtils.addToCollection(this._doctors, doctor, (item) =>
      EntityUtils.checkDuplicate(
        item,
        this._doctors,
        'Doctor',
        InvalidClinicException,
      ),
    );
  }

  public removeAnamnesis(anamnesis: Anamnesis): void {
    EntityUtils.removeFromCollection(
      this._anamnesis,
      anamnesis,
      InvalidClinicException,
      'Anamnesis not found',
    );
  }

  public removeExam(exam: Exam): void {
    EntityUtils.removeFromCollection(
      this._exams,
      exam,
      InvalidClinicException,
      'Exam not found',
    );
  }

  public removePatient(patient: Patient): void {
    EntityUtils.removeFromCollection(
      this._patients,
      patient,
      InvalidClinicException,
      'Patient not found',
    );
  }

  public removeDoctor(doctor: Doctor): void {
    EntityUtils.removeFromCollection(
      this._doctors,
      doctor,
      InvalidClinicException,
      'Doctor not found',
    );
  }

  public isAnamnesisAssociated(anamnesis: Anamnesis): boolean {
    return EntityUtils.isAssociatedWith(this._anamnesis, anamnesis);
  }

  public isExamAssociated(exam: Exam): boolean {
    return EntityUtils.isAssociatedWith(this._exams, exam);
  }

  public isPatientAssociated(patient: Patient): boolean {
    return EntityUtils.isAssociatedWith(this._patients, patient);
  }

  public isDoctorAssociated(doctor: Doctor): boolean {
    return EntityUtils.isAssociatedWith(this._doctors, doctor);
  }

  public toDto(): any {
    return {
      id: this._id,
      name: this._props.name,
      email: this._props.email.value,
      password: this._passwordHash,
      address: this._props.address,
      contactInfo: this._props.contactInfo,
      doctors: this._doctors.map((doctor) => doctor.id),
      patients: this._patients.map((patient) => patient.id),
      exams: this._exams.map((exam) => exam.id),
      anamnesis: this._anamnesis.map((anamnesis) => anamnesis.id),
      createdAt: this._props.createdAt,
      updatedAt: this._props.updatedAt,
    };
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._props.name;
  }

  get email(): string {
    return this._props.email.value;
  }

  get address(): Address {
    return this._props.address;
  }

  get contactInfo(): ContactInfo {
    return this._props.contactInfo;
  }

  get passwordHash(): string {
    return this._passwordHash;
  }

  get createdAt(): Date {
    return this._props.createdAt;
  }

  get updatedAt(): Date {
    return this._props.updatedAt;
  }

  get anamnesis(): Anamnesis[] {
    return [...this._anamnesis];
  }

  get exams(): Exam[] {
    return [...this._exams];
  }

  get doctors(): Doctor[] {
    return [...this._doctors];
  }

  get patients(): Patient[] {
    return [...this._patients];
  }
}
