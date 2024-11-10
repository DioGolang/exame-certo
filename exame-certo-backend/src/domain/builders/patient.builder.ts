import { PatientProps } from '../interfaces/props/patient-props.interface';
import { SocioEconomicInformation } from '../value-objects/socio-economic-information.vo';
import { Documentation } from '../value-objects/documentation.vo';
import { MaritalStatus } from '../enums/marital-status.enum';
import { Sex } from '../enums/sex.enum';
import { Patient } from '../entities/patient.entity';
import { Anamnesis } from '../entities/anamnesis.entity';
import { Exam } from '../entities/exam.entity';
import { Clinic } from '../entities/clinic.entity';
import { Doctor } from '../entities/doctor.entity';
import { DocumentationDto } from '../../application/shared/dtos/documentation.dto';
import { SocioEconomicInformationDto } from '../../application/shared/dtos/socio-economic-information.dto';
import { BaseEntityBuilder } from './entity.builder';

export class PatientBuilder extends BaseEntityBuilder<Patient, PatientProps> {
  private anamnesis: Anamnesis[] = [];
  private exams: Exam[] = [];
  private clinics: Clinic[] = [];
  private doctors: Doctor[] = [];

  public withLastName(lastName: string): PatientBuilder {
    this._props.lastName = lastName;
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

  public async build(): Promise<Patient> {
    this.validateRequiredProperties();

    const patient = new Patient(
      this._id,
      this._props as PatientProps,
      this._passwordHash,
    );
    this.addRelationshipsToEntities(patient);
    return patient;
  }

  protected validateRequiredProperties(): void {
    if (
      !this._props.name ||
      !this._props.email ||
      !this._props.address ||
      !this._props.contactInfo
    ) {
      throw new Error('Missing required properties to build Patient.');
    }
  }

  protected addRelationshipsToEntities(patient: Patient): void {
    this.anamnesis.forEach((a) => patient.addAnamnesis(a));
    this.exams.forEach((e) => patient.addExam(e));
    this.clinics.forEach((c) => patient.addClinic(c));
    this.doctors.forEach((d) => patient.addDoctor(d));
  }
}
