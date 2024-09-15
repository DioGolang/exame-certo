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
    return Promise.all(
      anamnesisEntities.map((entity) => this.anamnesisMapper.toDomain(entity)),
    );
  }

  async mapClinicsToDomain(clinicEntities: ClinicEntity[]): Promise<Clinic[]> {
    return Promise.all(
      clinicEntities.map((entity) => this.clinicMapper.toDomain(entity)),
    );
  }

  async mapPatientsToDomain(
    patientEntities: PatientEntity[],
  ): Promise<Patient[]> {
    return Promise.all(
      patientEntities.map((entity) => this.patientMapper.toDomain(entity)),
    );
  }

  async mapDoctorsToDomain(doctorEntities: DoctorEntity[]): Promise<Doctor[]> {
    return Promise.all(
      doctorEntities.map((entity) => this.doctorMapper.toDomain(entity)),
    );
  }

  async mapExamsToDomain(examEntities: ExamEntity[]): Promise<Exam[]> {
    return Promise.all(
      examEntities.map((entity) => this.examMapper.toDomain(entity)),
    );
  }
  async mapReportsToDomain(reportEntities: ReportEntity[]): Promise<Report[]> {
    return Promise.all(
      reportEntities.map((entity) => this.reportMapper.toDomain(entity)),
    );
  }
}
