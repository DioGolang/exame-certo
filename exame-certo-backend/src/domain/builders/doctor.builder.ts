import { ContactInfo } from "../value-objects/contact-info.vo";
import { Address } from "../value-objects/address.vo";
import { Clinic } from "../entites/clinic.entity";
import { Patient } from "../entites/patient.entity";
import { Exam } from "../entites/exam.entity";
import { Anamnesis } from "../entites/anamnesis.entity";
import { Report } from "../entites/report.entity";
import { IHasher } from "../interfaces/hasher.interface";
import { DoctorValidationService } from "../services/validation/doctor-validation.service";
import { ContactInfoDto } from "../../application/dtos/contact-info.dto";
import { Doctor } from "../entites/doctor.entity";

export class DoctorBuilder{
  private _id: string | null = null; // UUID
  private _name: string;
  private _email: string;
  private _password: string;
  private _contactInfo: ContactInfo;
  private _professionalAddress: Address;
  private _registrationNumber: string;
  private _specialization: string;
  private _clinic: Clinic;
  private _patients: Patient[];
  private _exams: Exam[];
  private _anamnesis: Anamnesis[];
  private _reports: Report[];

  private readonly _validator: DoctorValidationService;
  private readonly _hasher: IHasher;


  constructor(
    validator: DoctorValidationService,
    hasher: IHasher
  ) {
    this._validator = validator;
    this._hasher = hasher;
  }

  withId(id?: string): this {
    this._id = id;
    return this
  }

  withEmail(email: string): this {
    this._email = email;
    return this
  }

  withContactInfo(contactInfo: ContactInfoDto): this {
    this._contactInfo = ContactInfo.fromDto(contactInfo)
    return this
  }

  withProfessionalAddress(professionalAddress: Address): this{
    this._professionalAddress = Address.fromDto(professionalAddress)
    return this
  }

  withRegistrationNumber(registrationNumber: string): this{
    this._registrationNumber = registrationNumber
    return this
  }

  withSpecialization(specialization: string): this{
    this._specialization = specialization
    return this
  }

  withClinic(clinic: Clinic): this {
    this._clinic = clinic;
    return this;
  }

  withPatients(patients: Patient[]): this {
    this._patients = patients;
    return this;
  }

  withExams(exams: Exam[]): this {
    this._exams = exams;
    return this;
  }

  withAnamnesis(anamnesis: Anamnesis[]): this {
    this._anamnesis = anamnesis;
    return this;
  }

  withReports(reports: Report[]): this {
    this._reports = reports;
    return this;
  }

  async build(): Promise<Doctor> {
    const hashedPassword = await this._hasher.hash(this._password);
    return new Doctor(
      this._id,
      this._name,
      this._email,
      hashedPassword,
      this._contactInfo,
      this._professionalAddress,
      this._registrationNumber,
      this._specialization,
      this._clinic,
      this._patients,
      this._exams,
      this._anamnesis,
      this._reports,
      this._hasher
    );
  }
}