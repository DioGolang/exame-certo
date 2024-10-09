import { Doctor } from '../entities/doctor.entity';
import { DoctorProps } from '../interfaces/props/doctor-props.interface';
import { Anamnesis } from '../entities/anamnesis.entity';
import { Exam } from '../entities/exam.entity';
import { Clinic } from '../entities/clinic.entity';
import { Report } from '../entities/report.entity';
import { AddressDto } from '../../application/shared/dtos/address.dto';
import { BaseEntityBuilder } from './entity.builder';

export class DoctorBuilder extends BaseEntityBuilder<Doctor, DoctorProps> {
  private _anamnesis: Anamnesis[] = [];
  private _exams: Exam[] = [];
  private _clinics: Clinic[] = [];
  private _reports: Report[] = [];

  withName(name: string): DoctorBuilder {
    this._props.name = name;
    return this;
  }

  withProfessionalAddress(professionalAddress: AddressDto): DoctorBuilder {
    return this.withAddress(professionalAddress);
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

  withClinics(clinics: Clinic[]): DoctorBuilder {
    this._clinics = clinics;
    return this;
  }

  withReport(reports: Report[]): DoctorBuilder {
    this._reports = reports;
    return this;
  }

  public async build(): Promise<Doctor> {
    this.validateRequiredProperties();
    const doctor = new Doctor(
      this._id,
      this._props as DoctorProps,
      this._passwordHash,
    );
    this.addRelationshipsToEntities(doctor);
    return doctor;
  }

  protected validateRequiredProperties(): void {
    if (
      !this._props.name ||
      !this._props.email ||
      !this._props.address ||
      !this._props.contactInfo
    ) {
      throw new Error('Missing required properties to build Doctor.');
    }
  }

  protected addRelationshipsToEntities(doctor: Doctor): void {
    this._anamnesis.forEach((a) => doctor.addAnamnesis(a));
    this._exams.forEach((e) => doctor.addExam(e));
    this._clinics.forEach((c) => doctor.addClinic(c));
    this._reports.forEach((r) => doctor.addReport(r));
  }
}
