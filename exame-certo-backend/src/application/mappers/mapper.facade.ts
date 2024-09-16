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

  private async mapEntityToDomain<T, U>(
    entities: T[],
    mapper: { toDomain(entity: T): U | Promise<U> },
  ): Promise<U[]> {
    return Promise.all(entities.map((entity) => mapper.toDomain(entity)));
  }

  private async mapSingleEntityToDomain<T, U>(
    entity: T,
    mapper: { toDomain(entity: T): Promise<U> },
  ): Promise<U> {
    return mapper.toDomain(entity);
  }

  async mapAnamnesisToDomain(
    anamnesisEntities: AnamnesisEntity[],
  ): Promise<Anamnesis[]> {
    return this.mapEntityToDomain(anamnesisEntities, this.anamnesisMapper);
  }

  async mapSingleAnamnesisToDomain(
    anamnesisEntity: AnamnesisEntity,
  ): Promise<Anamnesis> {
    return this.mapSingleEntityToDomain(anamnesisEntity, this.anamnesisMapper);
  }

  async mapClinicsToDomain(clinicEntities: ClinicEntity[]): Promise<Clinic[]> {
    return this.mapEntityToDomain(clinicEntities, this.clinicMapper);
  }

  async mapClinicToDomain(clinicEntity: ClinicEntity): Promise<Clinic> {
    return this.mapSingleEntityToDomain(clinicEntity, this.clinicMapper);
  }

  async mapPatientsToDomain(
    patientEntities: PatientEntity[],
  ): Promise<Patient[]> {
    return this.mapEntityToDomain(patientEntities, this.patientMapper);
  }

  async mapPatientToDomain(patientEntity: PatientEntity): Promise<Patient> {
    return this.mapSingleEntityToDomain(patientEntity, this.patientMapper);
  }

  async mapDoctorsToDomain(doctorEntities: DoctorEntity[]): Promise<Doctor[]> {
    return this.mapEntityToDomain(doctorEntities, this.doctorMapper);
  }

  async mapDoctorToDomain(doctorEntity: DoctorEntity): Promise<Doctor> {
    return this.mapSingleEntityToDomain(doctorEntity, this.doctorMapper);
  }

  async mapExamsToDomain(examEntities: ExamEntity[]): Promise<Exam[]> {
    return this.mapEntityToDomain(examEntities, this.examMapper);
  }

  async mapExamToDomain(examEntity: ExamEntity): Promise<Exam> {
    return this.mapSingleEntityToDomain(examEntity, this.examMapper);
  }

  async mapReportsToDomain(reportEntities: ReportEntity[]): Promise<Report[]> {
    return this.mapEntityToDomain(reportEntities, this.reportMapper);
  }

  async mapReportToDomain(reportEntity: ReportEntity): Promise<Report> {
    return this.mapSingleEntityToDomain(reportEntity, this.reportMapper);
  }
}
