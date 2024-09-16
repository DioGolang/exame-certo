import { Injectable } from '@nestjs/common';
import { AnamnesisMapper } from '../../infra/database/repositories/mappers/anamnesis.mapper';
import { PatientMapper } from '../../infra/database/repositories/mappers/patient.mapper';
import { AnamnesisEntity } from '../../infra/database/entities/anamnesis.entity';
import { Anamnesis } from '../../domain/entities/anamnesis.entity';
import { ClinicEntity } from '../../infra/database/entities/clinic.entity';
import { Clinic } from '../../domain/entities/clinic.entity';
import { PatientEntity } from '../../infra/database/entities/patient.entity';
import { Patient } from '../../domain/entities/patient.entity';
import { DoctorEntity } from '../../infra/database/entities/doctor.entity';
import { ExamEntity } from '../../infra/database/entities/exam.entity';
import { Exam } from '../../domain/entities/exam.entity';
import { Doctor } from '../../domain/entities/doctor.entity';
import { ExamMapper } from '../../infra/database/repositories/mappers/exam.mapper';
import { DoctorMapper } from '../../infra/database/repositories/mappers/doctor.mapper';
import { ClinicMapper } from '../../infra/database/repositories/mappers/clinic.mapper';
import { ReportMapper } from '../../infra/database/repositories/mappers/report.mapper';
import { Report } from '../../domain/entities/report.entity';
import { ReportEntity } from '../../infra/database/entities/report.entity';

@Injectable()
export class MapperFacade {
  constructor(
    private readonly anamnesisMapper: AnamnesisMapper,
    private readonly examMapper: ExamMapper,
    private readonly reportMapper: ReportMapper,
    private readonly patientMapper: PatientMapper,
    private readonly clinicMapper: ClinicMapper,
    private readonly doctorMapper: DoctorMapper,
  ) {}

  async mapAnamnesisToDomain(
    anamnesisEntities: AnamnesisEntity[],
  ): Promise<Anamnesis[]> {
    return this.mapEntityToDomain(anamnesisEntities, this.anamnesisMapper);
  }

  async mapSingleAnamnesisToPersistence(
    anamnesis: Anamnesis,
  ): Promise<AnamnesisEntity> {
    return this.mapSingleEntityToPersistence(anamnesis, this.anamnesisMapper);
  }

  async mapSingleAnamnesisToDomain(
    anamnesisEntity: AnamnesisEntity,
  ): Promise<Anamnesis> {
    return this.mapSingleEntityToDomain(anamnesisEntity, this.anamnesisMapper);
  }

  async mapAnamnesisToPersistence(
    anamnesis: Anamnesis[],
  ): Promise<AnamnesisEntity[]> {
    return this.mapEntityToPersistence(anamnesis, this.anamnesisMapper);
  }

  async mapClinicsToDomain(clinicEntities: ClinicEntity[]): Promise<Clinic[]> {
    return this.mapEntityToDomain(clinicEntities, this.clinicMapper);
  }

  async mapClinicToPersistence(clinic: Clinic): Promise<ClinicEntity> {
    return this.mapSingleEntityToPersistence(clinic, this.clinicMapper);
  }

  async mapClinicToDomain(clinicEntity: ClinicEntity): Promise<Clinic> {
    return this.mapSingleEntityToDomain(clinicEntity, this.clinicMapper);
  }
  async mapClinicsToPersistence(clinics: Clinic[]): Promise<ClinicEntity[]> {
    return this.mapEntityToPersistence(clinics, this.clinicMapper);
  }

  async mapPatientsToDomain(
    patientEntities: PatientEntity[],
  ): Promise<Patient[]> {
    return this.mapEntityToDomain(patientEntities, this.patientMapper);
  }

  async mapPatientToPersistence(patient: Patient): Promise<PatientEntity> {
    return this.mapSingleEntityToPersistence(patient, this.patientMapper);
  }

  async mapPatientToDomain(patientEntity: PatientEntity): Promise<Patient> {
    return this.mapSingleEntityToDomain(patientEntity, this.patientMapper);
  }

  async mapPatientsToPersistence(
    patients: Patient[],
  ): Promise<PatientEntity[]> {
    return this.mapEntityToPersistence(patients, this.patientMapper);
  }

  async mapDoctorsToDomain(doctorEntities: DoctorEntity[]): Promise<Doctor[]> {
    return this.mapEntityToDomain(doctorEntities, this.doctorMapper);
  }

  async mapDoctorToPersistence(doctor: Doctor): Promise<DoctorEntity> {
    return this.mapSingleEntityToPersistence(doctor, this.doctorMapper);
  }

  async mapDoctorToDomain(doctorEntity: DoctorEntity): Promise<Doctor> {
    return this.mapSingleEntityToDomain(doctorEntity, this.doctorMapper);
  }

  async mapDoctorsToPersistence(doctors: Doctor[]): Promise<DoctorEntity[]> {
    return this.mapEntityToPersistence(doctors, this.doctorMapper);
  }

  async mapExamsToDomain(examEntities: ExamEntity[]): Promise<Exam[]> {
    return this.mapEntityToDomain(examEntities, this.examMapper);
  }

  async mapExamToPersistence(exam: Exam): Promise<ExamEntity> {
    return this.mapSingleEntityToPersistence(exam, this.examMapper);
  }

  async mapExamToDomain(examEntity: ExamEntity): Promise<Exam> {
    return this.mapSingleEntityToDomain(examEntity, this.examMapper);
  }

  async mapExamsToPersistence(exams: Exam[]): Promise<ExamEntity[]> {
    return this.mapEntityToPersistence(exams, this.examMapper);
  }

  async mapReportsToDomain(reportEntities: ReportEntity[]): Promise<Report[]> {
    return this.mapEntityToDomain(reportEntities, this.reportMapper);
  }

  async mapReportToPersistence(report: Report): Promise<ReportEntity> {
    return this.mapSingleEntityToPersistence(report, this.reportMapper);
  }

  async mapReportToDomain(reportEntity: ReportEntity): Promise<Report> {
    return this.mapSingleEntityToDomain(reportEntity, this.reportMapper);
  }

  async mapReportsToPersistence(reports: Report[]): Promise<ReportEntity[]> {
    return this.mapEntityToPersistence(reports, this.reportMapper);
  }

  private async mapEntityToDomain<T, U>(
    entities: T[],
    mapper: { toDomain(entity: T): Promise<U> },
  ): Promise<U[]> {
    return Promise.all(entities.map((entity) => mapper.toDomain(entity)));
  }

  private async mapEntityToPersistence<T, U>(
    entities: T[],
    mapper: { toPersistence(domain: T): Promise<U> },
  ): Promise<U[]> {
    return Promise.all(entities.map((entity) => mapper.toPersistence(entity)));
  }

  private async mapSingleEntityToDomain<T, U>(
    entity: T,
    mapper: { toDomain(entity: T): Promise<U> },
  ): Promise<U> {
    return mapper.toDomain(entity);
  }
  private async mapSingleEntityToPersistence<T, U>(
    entity: T,
    mapper: { toPersistence(domain: T): Promise<U> },
  ): Promise<U> {
    return mapper.toPersistence(entity);
  }
}
