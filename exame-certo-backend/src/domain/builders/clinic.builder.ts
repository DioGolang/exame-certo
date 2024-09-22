import { Address } from '../value-objects/address.vo';
import { ContactInfo } from '../value-objects/contact-info.vo';
import { Clinic } from '../entities/clinic.entity';
import { ClinicProps } from '../interfaces/props/clinic-props.interface';
import { v4 as uuidv4 } from 'uuid';
import { Email } from '../value-objects/email.vo';
import { Anamnesis } from '../entities/anamnesis.entity';
import { Exam } from '../entities/exam.entity';
import { Doctor } from '../entities/doctor.entity';
import { Patient } from '../entities/patient.entity';
import { PasswordUtils } from '../../shared/utils/password.utils';
import { AddressDto } from '../../application/shared/dtos/address.dto';
import { ContactInfoDto } from '../../application/shared/dtos/contact-info.dto';

export class ClinicBuilder {
  private readonly _id: string;
  private readonly _password?: string;
  private readonly encryptedPassword?: string;
  private readonly _props: Partial<ClinicProps> = {};
  private _anamnesis: Anamnesis[] = [];
  private _exams: Exam[] = [];
  private _patients: Patient[] = [];
  private _doctors: Doctor[] = [];

  private constructor(
    id: string,
    encryptedPassword?: string,
    password?: string,
  ) {
    this._id = id;
    this.encryptedPassword = encryptedPassword;
    this._password = password;
  }

  public static create(password: string): ClinicBuilder {
    const createdAt = new Date();
    const id = uuidv4();
    const builder = new ClinicBuilder(id, undefined, password);
    return builder.withCreatedAt(createdAt).withUpdatedAt(createdAt);
  }

  public static rehydrate(
    id: string,
    encryptedPassword: string,
  ): ClinicBuilder {
    return new ClinicBuilder(id, encryptedPassword);
  }

  withName(name: string): ClinicBuilder {
    this._props.name = name;
    return this;
  }

  withEmail(email: string): ClinicBuilder {
    this._props.email = Email.create(email);
    return this;
  }

  withAddress(address: AddressDto): ClinicBuilder {
    this._props.address = Address.fromDto(address);
    return this;
  }

  withContactInfo(contactInfoDto: ContactInfoDto): ClinicBuilder {
    this._props.contactInfo = ContactInfo.fromDto(contactInfoDto);
    return this;
  }

  withAnamnesis(anamnesis: Anamnesis[]): ClinicBuilder {
    this._anamnesis = anamnesis;
    return this;
  }

  withExams(exam: Exam[]): ClinicBuilder {
    this._exams = exam;
    return this;
  }

  withPatients(patient: Patient[]): ClinicBuilder {
    this._patients = patient;
    return this;
  }

  withDoctors(doctor: Doctor[]): ClinicBuilder {
    this._doctors = doctor;
    return this;
  }

  public withCreatedAt(createdAt: Date): ClinicBuilder {
    this._props.createdAt = createdAt;
    return this;
  }

  public withUpdatedAt(updatedAt: Date): ClinicBuilder {
    this._props.updatedAt = updatedAt;
    return this;
  }

  async build(): Promise<Clinic> {
    this.validateRequiredProperties();
    const finalPasswordHash = await this.getFinalPasswordHash();

    const clinic = new Clinic(
      this._id,
      this._props as ClinicProps,
      finalPasswordHash,
    );

    this.addRelationshipsToClinic(clinic);
    return clinic;
  }

  private validateRequiredProperties(): void {
    if (
      !this._props.name ||
      !this._props.email ||
      !this._props.address ||
      !this._props.contactInfo
    ) {
      throw new Error('Missing required properties to build Clinic.');
    }
  }

  private async getFinalPasswordHash(): Promise<string> {
    return PasswordUtils.determinePasswordHash(
      this._password,
      this.encryptedPassword,
    );
  }
  private addRelationshipsToClinic(clinic: Clinic): void {
    this._anamnesis.forEach((a) => clinic.addAnamnesis(a));
    this._exams.forEach((e) => clinic.addExam(e));
    this._patients.forEach((p) => clinic.addPatient(p));
    this._doctors.forEach((d) => clinic.addDoctor(d));
  }
}
