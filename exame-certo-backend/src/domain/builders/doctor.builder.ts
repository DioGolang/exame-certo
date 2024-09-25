import { ContactInfo } from '../value-objects/contact-info.vo';
import { Address } from '../value-objects/address.vo';
import { Doctor } from '../entities/doctor.entity';
import { DoctorProps } from '../interfaces/props/doctor-props.interface';
import { v4 as uuidv4 } from 'uuid';
import { Email } from '../value-objects/email.vo';
import { Anamnesis } from '../entities/anamnesis.entity';
import { Exam } from '../entities/exam.entity';
import { Clinic } from '../entities/clinic.entity';
import { Report } from '../entities/report.entity';
import { PasswordUtils } from '../../shared/utils/password.utils';
import { ContactInfoDto } from '../../application/shared/dtos/contact-info.dto';

export class DoctorBuilder {
  private readonly _id: string;
  private readonly _password: string;
  private _props: Partial<DoctorProps>;
  private _anamnesis: Anamnesis[] = [];
  private _exams: Exam[] = [];
  private _clinics: Clinic[] = [];
  private _reports: Report[] = [];

  private constructor(
    password?: string,
    private readonly encryptedPassword?: string,
    id?: string,
  ) {
    this._id = id || uuidv4();
    this._password = password || '';
  }

  public static create(password: string): DoctorBuilder {
    return new DoctorBuilder(password);
  }

  public static rehydrate(
    id: string,
    encryptedPassword: string,
  ): DoctorBuilder {
    return new DoctorBuilder(undefined, encryptedPassword, id);
  }

  public static createOrRehydrate(
    id?: string,
    password?: string,
    encryptedPassword?: string,
  ): DoctorBuilder {
    if (id) {
      return this.rehydrate(id, encryptedPassword!);
    } else {
      return this.create(password!);
    }
  }

  withName(name: string): DoctorBuilder {
    this._props.name = name;
    return this;
  }

  withEmail(email: string): DoctorBuilder {
    this._props.email = Email.create(email);
    return this;
  }

  withContactInfo(contactInfo: ContactInfoDto): DoctorBuilder {
    this._props.contactInfo = ContactInfo.fromDto(contactInfo);
    return this;
  }

  withProfessionalAddress(professionalAddress: Address): DoctorBuilder {
    this._props.address = Address.fromDto(professionalAddress);
    return this;
  }

  withRegistrationNumber(registrationNumber: string): DoctorBuilder {
    this._props.registrationNumber = registrationNumber;
    return this;
  }

  withSpecialization(specialization: string): DoctorBuilder {
    this._props.specialization = specialization;
    return this;
  }

  withAnamnesis(anamnesis: Anamnesis[]): DoctorBuilder {
    this._anamnesis = anamnesis;
    return this;
  }

  withExams(exams: Exam[]): DoctorBuilder {
    this._exams = exams;
    return this;
  }

  withClinics(clinic: Clinic[]): DoctorBuilder {
    this._clinics = clinic;
    return this;
  }

  withReport(report: Report[]): DoctorBuilder {
    this._reports = report;
    return this;
  }

  public withCreatedAt(createdAt: Date): DoctorBuilder {
    this._props.createdAt = createdAt;
    return this;
  }

  public withUpdatedAt(updatedAt: Date): DoctorBuilder {
    this._props.updatedAt = updatedAt;
    return this;
  }

  async build(): Promise<Doctor> {
    const finalPasswordHash = await PasswordUtils.determinePasswordHash(
      this._password,
      this.encryptedPassword,
    );
    const doctor = new Doctor(
      this._id,
      this._props as DoctorProps,
      finalPasswordHash,
    );
    this._anamnesis.forEach((a) => doctor.addAnamnesis(a));
    this._exams.forEach((e) => doctor.addExam(e));
    this._clinics.forEach((c) => doctor.addClinic(c));
    this._reports.forEach((r) => doctor.addReport(r));
    return doctor;
  }
}
