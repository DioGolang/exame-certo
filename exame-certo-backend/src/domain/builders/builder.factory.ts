import { PatientBuilder } from './patient.builder';
import { DoctorBuilder } from './doctor.builder';
import { ClinicBuilder } from './clinic.builder';
import { AnamnesisBuilder } from './anamnesisBuilder';
import { ExamBuilder } from './examBuilder';
import { ReportBuilder } from './reportBuilder';

export abstract class BuilderFactory {
  abstract createPatientBuilder(
    id?: string,
    password?: string,
    encryptedPassword?: string,
  ): Promise<PatientBuilder>;
  abstract createDoctorBuilder(
    id?: string,
    password?: string,
    encryptedPassword?: string,
  ): Promise<DoctorBuilder>;
  abstract createClinicBuilder(
    id?: string,
    password?: string,
    encryptedPassword?: string,
  ): Promise<ClinicBuilder>;
  abstract createAnamnesisBuilder(id?: string): Promise<AnamnesisBuilder>;
  abstract createExamBuilder(id?: string): Promise<ExamBuilder>;
  abstract createReportBuilder(id?: string): Promise<ReportBuilder>;
}
