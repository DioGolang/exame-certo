import { Address } from "../value-objects/address.vo";
import { ContactInfo } from "../value-objects/contact-info.vo";
import { Doctor } from "../entites/doctor.entity";
import { Patient } from "../entites/patient.entity";
import { Exam } from "../entites/exam.entity";
import { IHasher } from "../interfaces/hasher.interface";
import { ContactInfoDto } from "../../application/dtos/contact-info.dto";
import { Clinic } from "../entites/clinic.entity";
import { ClinicValidationService } from "../services/validation/clinic-validation.service";

export class ClinicBuilder{
  private  _id: string | null = null;
  private  _name: string;
  private  _email: string;
  private  _password: string;
  private  _address: Address;
  private  _contactInfo: ContactInfo
  private  _doctors: Doctor[];
  private  _patients: Patient[];
  private  _exams: Exam[];

  private readonly _validator: ClinicValidationService;
  private readonly _hasher: IHasher;

  constructor(
    validator: ClinicValidationService,
    hasher: IHasher
  ) {
    this._validator =validator;
    this._hasher = hasher;
  }

  withId(id?: string): this {
    this._id = id || null;
    return this;
  }

  withName(name: string): this {
    this._name = name;
    return this;
  }

  withEmail(email: string): this {
    this._email = email;
    return this;
  }

  withPassword(password: string): this {
    this._password = password;
    return this;
  }

  withAddress(address: Address): this {
    this._address = address;
    return this;
  }

  withContactInfo(contactInfoDto: ContactInfoDto): this {
    this._contactInfo = ContactInfo.fromDto(contactInfoDto);
    return this;
  }

  withDoctors(doctor: Doctor[]): this {
    this._doctors = [...doctor];
    return this;
  }

  withPatients(patients: Patient[]): this {
    this._patients = [...patients];
    return this;
  }

  withExam(exams: Exam[]): this {
    this._exams = [...exams];
    return this;
  }

  async build(): Promise<Clinic> {
    const hashedPassword = await this._hasher.hash(this._password);
    const clinic = new Clinic(
      this._id,
      this._name,
      this._email,
      hashedPassword,
      this._address,
      this._contactInfo,
      this._doctors,
      this._patients,
      this._exams,
      this._hasher,
    );
    this._validator.validate(clinic);
    return clinic
  }

}