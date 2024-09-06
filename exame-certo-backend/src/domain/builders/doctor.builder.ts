import { ContactInfo } from "../value-objects/contact-info.vo";
import { Address } from "../value-objects/address.vo";
import { ContactInfoDto } from "../../application/dtos/contact-info.dto";
import { Doctor } from "../entities/doctor.entity";
import { DoctorProps } from "../interfaces/props/doctor-props.interface";
import { v4 as uuidv4 } from 'uuid';
import { Email } from "../value-objects/email.vo";
import { PasswordHash } from "../../application/interfaces/hasher.interface";
import { Anamnesis } from "../entities/anamnesis.entity";
import { Exam } from "../entities/exam.entity";
import { Clinic } from "../entities/clinic.entity";
import { Report } from "../entities/report.entity";
import { PasswordUtils } from "../../shared/utils/password.utils";

export class DoctorBuilder{
  private readonly _id: string;
  private readonly _password: string;
  private _props: Partial<DoctorProps>;
  private _anamnesis: Anamnesis[] = [];
  private _exams: Exam[] = [];
  private _clinics: Clinic[] = [];
  private _reports: Report[] = [];

  private constructor(password?: string, private readonly encryptedPassword?: string, id?: string) {
    this._id = id || uuidv4();
    this._password = password || '';
  }

  public static create(password: string): DoctorBuilder{
    return new DoctorBuilder(password);
  }

  public static rehydrate(id: string, encryptedPassword: string): DoctorBuilder{
    return new DoctorBuilder(undefined, encryptedPassword, id);
  }

  public static createOrRehydrate(id?: string, password?: string, encryptedPassword?: string): DoctorBuilder {
    if (id) {
      return this.rehydrate(id, encryptedPassword!);
    } else {
      return this.create(password!);
    }
  }

  withEmail(email: Email): DoctorBuilder {
    this._props.email = email;
    return this
  }

  withContactInfo(contactInfo: ContactInfoDto): DoctorBuilder {
    this._props.contactInfo = ContactInfo.fromDto(contactInfo)
    return this
  }

  withProfessionalAddress(professionalAddress: Address): DoctorBuilder {
    this._props.professionalAddress = Address.fromDto(professionalAddress)
    return this
  }

  withRegistrationNumber(registrationNumber: string): DoctorBuilder {
    this._props.registrationNumber = registrationNumber
    return this
  }

  withSpecialization(specialization: string): DoctorBuilder {
    this._props.specialization = specialization
    return this
  }

  addAnamnesis(anamnesis: Anamnesis): DoctorBuilder {
    this._anamnesis.push(anamnesis);
    return this;
  }

  addExam(exam: Exam): DoctorBuilder {
    this._exams.push(exam);
    return this;
  }

  addClinic(clinic: Clinic): DoctorBuilder {
    this._clinics.push(clinic);
    return this;
  }

  addReport(report: Report): DoctorBuilder {
    this._reports.push(report);
    return this;
  }

   async build(): Promise<Doctor> {
    const finalPasswordHash = await PasswordUtils.determinePasswordHash(
      this._password,
      this.encryptedPassword
    );
    const doctor = new Doctor(this._id, this._props as DoctorProps, finalPasswordHash);
    this._anamnesis.forEach(a => doctor.addAnamnesis(a));
    this._exams.forEach(e => doctor.addExam(e));
    this._clinics.forEach(c => doctor.addClinic(c));
    this._reports.forEach(r => doctor.addReport(r));
    return doctor;
   }
}