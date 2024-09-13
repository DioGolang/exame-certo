import { AnamnesisBuilder } from './anamnesisBuilder';
import { BuilderFactory } from './builder.factory';
import { ClinicBuilder } from './clinic.builder';
import { DoctorBuilder } from './doctor.builder';
import { ExamBuilder } from './examBuilder';
import { PatientBuilder } from './patient.builder';
import { ReportBuilder } from './reportBuilder';

export class DefaultBuilderFactory extends BuilderFactory {
  async createPatientBuilder(
    id?: string,
    password?: string,
    encryptedPassword?: string,
  ): Promise<PatientBuilder> {
    return Promise.resolve(
      this.buildWithLogin(PatientBuilder, {
        id,
        password,
        encryptedPassword,
      }),
    );
  }
  async createDoctorBuilder(
    id?: string,
    password?: string,
    encryptedPassword?: string,
  ): Promise<DoctorBuilder> {
    return Promise.resolve(
      this.buildWithLogin(DoctorBuilder, {
        id,
        password,
        encryptedPassword,
      }),
    );
  }
  async createClinicBuilder(
    id?: string,
    password?: string,
    encryptedPassword?: string,
  ): Promise<ClinicBuilder> {
    return Promise.resolve(
      this.buildWithLogin(ClinicBuilder, {
        id,
        password,
        encryptedPassword,
      }),
    );
  }

  async createAnamnesisBuilder(id?: string): Promise<AnamnesisBuilder> {
    return Promise.resolve(this.buildWithoutLogin(AnamnesisBuilder, { id }));
  }
  async createExamBuilder(id?: string): Promise<ExamBuilder> {
    return Promise.resolve(this.buildWithoutLogin(ExamBuilder, { id }));
  }
  async createReportBuilder(id?: string): Promise<ReportBuilder> {
    return Promise.resolve(this.buildWithoutLogin(ReportBuilder, { id }));
  }

  private buildWithoutLogin<T>(
    BuilderClass: { create: () => T; rehydrate: (id: string) => T },
    entity: { id?: string },
  ): T {
    if (entity.id) {
      return BuilderClass.rehydrate(entity.id);
    }
    return BuilderClass.create();
  }

  private buildWithLogin<T>(
    BuilderClass: {
      create: (password?: string) => T;
      rehydrate: (id: string, encryptedPassword?: string) => T;
    },
    entity: { id?: string; password?: string; encryptedPassword?: string },
  ): T {
    if (entity.id) {
      return BuilderClass.rehydrate(entity.id, entity.encryptedPassword!);
    }
    return BuilderClass.create(entity.password!);
  }
}
