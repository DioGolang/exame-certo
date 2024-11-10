import { Clinic } from '../entities/clinic.entity';
import { ClinicProps } from '../interfaces/props/clinic-props.interface';
import { Anamnesis } from '../entities/anamnesis.entity';
import { Exam } from '../entities/exam.entity';
import { Doctor } from '../entities/doctor.entity';
import { Patient } from '../entities/patient.entity';
import { BaseEntityBuilder } from './entity.builder';

export class ClinicBuilder extends BaseEntityBuilder<Clinic, ClinicProps> {
  private _anamnesis: Anamnesis[] = [];
  private _exams: Exam[] = [];
  private _patients: Patient[] = [];
  private _doctors: Doctor[] = [];

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

  async build(): Promise<Clinic> {
    this.validateRequiredProperties();
    const clinic = new Clinic(
      this._id,
      this._props as ClinicProps,
      this._passwordHash,
    );
    this.addRelationshipsToEntities(clinic);
    return clinic;
  }

  protected validateRequiredProperties(): void {
    if (
      !this._props.name ||
      !this._props.email ||
      !this._props.address ||
      !this._props.contactInfo
    ) {
      throw new Error('Missing required properties to build Clinic.');
    }
  }

  protected addRelationshipsToEntities(clinic: Clinic): void {
    this._anamnesis.forEach((a) => clinic.addAnamnesis(a));
    this._exams.forEach((e) => clinic.addExam(e));
    this._patients.forEach((p) => clinic.addPatient(p));
    this._doctors.forEach((d) => clinic.addDoctor(d));
  }
}
