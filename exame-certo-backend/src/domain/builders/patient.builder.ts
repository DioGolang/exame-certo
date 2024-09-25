import { PatientProps } from '../interfaces/props/patient-props.interface';
import { v4 as uuidv4 } from 'uuid';
import { SocioEconomicInformation } from '../value-objects/socio-economic-information.vo';
import { Documentation } from '../value-objects/documentation.vo';
import { ContactInfo } from '../value-objects/contact-info.vo';
import { Address } from '../value-objects/address.vo';
import { MaritalStatus } from '../enums/marital-status.enum';
import { Sex } from '../enums/sex.enum';
import { Email } from '../value-objects/email.vo';
import { Patient } from '../entities/patient.entity';
import { Anamnesis } from '../entities/anamnesis.entity';
import { Exam } from '../entities/exam.entity';
import { Clinic } from '../entities/clinic.entity';
import { Doctor } from '../entities/doctor.entity';
import { PasswordUtils } from '../../shared/utils/password.utils';
import { AddressDto } from '../../application/shared/dtos/address.dto';
import { ContactInfoDto } from '../../application/shared/dtos/contact-info.dto';
import { DocumentationDto } from '../../application/shared/dtos/documentation.dto';
import { SocioEconomicInformationDto } from '../../application/shared/dtos/socio-economic-information.dto';

export class PatientBuilder {
  private readonly _id: string;
  private readonly _password: string;
  private readonly encryptedPassword?: string;
  private _props: Partial<PatientProps> = {};
  private anamnesis: Anamnesis[] = [];
  private exams: Exam[] = [];
  private clinics: Clinic[] = [];
  private doctors: Doctor[] = [];

  private constructor(
    id: string,
    encryptedPassword?: string,
    password?: string,
  ) {
    this._id = id;
    this.encryptedPassword = encryptedPassword;
    this._password = password;
  }

  public static async create(password: string): Promise<PatientBuilder> {
    const createdAt = new Date();
    const id = uuidv4();
    const builder = new PatientBuilder(id, undefined, password);
    return builder.withCreatedAt(createdAt).withUpdatedAt(createdAt);
  }

  public static async rehydrate(
    id: string,
    encryptedPassword: string,
  ): Promise<PatientBuilder> {
    return new PatientBuilder(id, encryptedPassword);
  }

  public withName(name: string): PatientBuilder {
    this._props.name = name;
    return this;
  }

  public withLastName(lastName: string): PatientBuilder {
    this._props.lastName = lastName;
    return this;
  }

  public withEmail(email: string): PatientBuilder {
    this._props.email = Email.create(email);
    return this;
  }

  public withDateOfBirth(dateOfBirth: Date): PatientBuilder {
    this._props.dateOfBirth = dateOfBirth;
    return this;
  }

  public withSex(sex: Sex): PatientBuilder {
    this._props.sex = sex;
    return this;
  }

  public withMaritalStatus(maritalStatus: MaritalStatus): PatientBuilder {
    this._props.maritalStatus = maritalStatus;
    return this;
  }

  public withAddress(address: AddressDto): PatientBuilder {
    this._props.address = Address.fromDto(address);
    return this;
  }

  public withContactInfo(contactInfo: ContactInfoDto): PatientBuilder {
    this._props.contactInfo = ContactInfo.fromDto(contactInfo);
    return this;
  }

  public withDocumentation(documentation: DocumentationDto): PatientBuilder {
    this._props.documentation = Documentation.fromDto(documentation);
    return this;
  }

  public withSocioeconomicInformation(
    info: SocioEconomicInformationDto,
  ): PatientBuilder {
    this._props.socioeconomicInformation =
      SocioEconomicInformation.fromDto(info);
    return this;
  }

  public withHealthInsurance(healthInsurance: string): PatientBuilder {
    this._props.healthInsurance = healthInsurance;
    return this;
  }

  public withAnamnesis(anamnesis: Anamnesis[]): PatientBuilder {
    this.anamnesis = anamnesis;
    return this;
  }

  public withExams(exams: Exam[]): PatientBuilder {
    this.exams = exams;
    return this;
  }

  public withClinics(clinics: Clinic[]): PatientBuilder {
    this.clinics = clinics;
    return this;
  }

  public withDoctors(doctors: Doctor[]): PatientBuilder {
    this.doctors = doctors;
    return this;
  }

  public withCreatedAt(createdAt: Date): PatientBuilder {
    this._props.createdAt = createdAt;
    return this;
  }

  public withUpdatedAt(updatedAt: Date): PatientBuilder {
    this._props.updatedAt = updatedAt;
    return this;
  }

  public async build(): Promise<Patient> {
    this.validateRequiredProperties();
    const finalPasswordHash = await this.getFinalPasswordHash();

    const patient = new Patient(
      this._id,
      this._props as PatientProps,
      finalPasswordHash,
    );
    this.addRelationshipsToPatient(patient);
    return patient;
  }

  private validateRequiredProperties(): void {
    if (
      !this._props.name ||
      !this._props.email ||
      !this._props.address ||
      !this._props.contactInfo
    ) {
      throw new Error('Missing required properties to build Patient.');
    }
  }

  private async getFinalPasswordHash(): Promise<string> {
    return PasswordUtils.determinePasswordHash(
      this._password,
      this.encryptedPassword,
    );
  }

  private addRelationshipsToPatient(patient: Patient): void {
    this.anamnesis.forEach((a) => patient.addAnamnesis(a));
    this.exams.forEach((e) => patient.addExam(e));
    this.clinics.forEach((c) => patient.addClinic(c));
    this.doctors.forEach((d) => patient.addDoctor(d));
  }
}
