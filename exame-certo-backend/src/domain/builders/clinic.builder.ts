import { Address } from '../value-objects/address.vo';
import { ContactInfo } from '../value-objects/contact-info.vo';
import { ContactInfoDto } from '../../application/dtos/contact-info.dto';
import { Clinic } from '../entities/clinic.entity';
import { ClinicProps } from '../interfaces/props/clinic-props.interface';
import { v4 as uuidv4 } from 'uuid';
import { Email } from '../value-objects/email.vo';
import { Anamnesis } from '../entities/anamnesis.entity';
import { Exam } from '../entities/exam.entity';
import { Doctor } from '../entities/doctor.entity';
import { Patient } from '../entities/patient.entity';
import { PasswordUtils } from '../../shared/utils/password.utils';
import { AddressDto } from '../../application/dtos/address.dto';

export class ClinicBuilder {
  private readonly _id: string;
  private readonly _password: string;
  private _props: Partial<ClinicProps> = {};
  private _anamnesis: Anamnesis[] = [];
  private _exams: Exam[] = [];
  private _patients: Patient[] = [];
  private _doctors: Doctor[] = [];

  private constructor(
    password?: string,
    private readonly encryptedPassword?: string,
    id?: string,
  ) {
    this._id = id || uuidv4();
    this._password = password || '';
  }

  public static create(password: string): ClinicBuilder {
    return new ClinicBuilder(password);
  }

  public static rehydrate(
    id: string,
    encryptedPassword: string,
  ): ClinicBuilder {
    return new ClinicBuilder(undefined, encryptedPassword, id);
  }

  public static async createOrRehydrate(
    id?: string,
    password?: string,
    encryptedPassword?: string,
  ): Promise<ClinicBuilder> {
    if (id) {
      return this.rehydrate(id, encryptedPassword!);
    } else {
      return this.create(password!);
    }
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

  withPatient(patient: Patient[]): ClinicBuilder {
    this._patients = patient;
    return this;
  }

  withDoctor(doctor: Doctor[]): ClinicBuilder {
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
    const finalPasswordHash = await PasswordUtils.determinePasswordHash(
      this._password,
      this.encryptedPassword,
    );
    const clinic = new Clinic(
      this._id,
      this._props as ClinicProps,
      finalPasswordHash,
    );
    this._anamnesis.forEach((a) => clinic.addAnamnesis(a));
    this._exams.forEach((e) => clinic.addExam(e));
    this._patients.forEach((p) => clinic.addPatient(p));
    this._doctors.forEach((d) => clinic.addDoctor(d));
    return clinic;
  }
}
