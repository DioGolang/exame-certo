import { AnamnesisBuilder } from "./anamnesisBuilder";
import { BuilderFactory } from "./builder.factory";
import { ClinicBuilder } from "./clinic.builder";
import { DoctorBuilder } from "./doctor.builder";
import { ExamBuilder } from "./examBuilder";
import { PatientBuilder } from "./patient.builder";
import { ReportBuilder } from "./reportBuilder";


export class DefaultBuilderFactory extends BuilderFactory {

  public createOrRehydrate<T>(
    BuilderClass: { create: () => T; rehydrate: (id: string) => T },
    entity: { id?: string },
  ): T {
    if (entity.id) {
      return BuilderClass.rehydrate(entity.id);
    }
    return BuilderClass.create();
  }

  public createOrRehydrateWithPassword<T>(
    BuilderClass: { create: (password?: string) => T; rehydrate: (id: string, encryptedPassword?: string) => T },
    entity: { id?: string, password?: string, encryptedPassword?: string },
  ): T {
    if (entity.id) {
      return BuilderClass.rehydrate(entity.id, entity.encryptedPassword!);
    }
    return BuilderClass.create(entity.password!);
  }

   async createPatientBuilder(id?: string, password?: string, encryptedPassword?: string): Promise<PatientBuilder> {
        return Promise.resolve(this.createOrRehydrateWithPassword(PatientBuilder, { id, password, encryptedPassword }));
    }
    async createDoctorBuilder(id?: string, password?: string, encryptedPassword?: string): Promise<DoctorBuilder> {
        return Promise.resolve(this.createOrRehydrateWithPassword(DoctorBuilder, { id, password, encryptedPassword }));
      }
   async createClinicBuilder(id?: string, password?: string, encryptedPassword?: string): Promise<ClinicBuilder> {
        return Promise.resolve(this.createOrRehydrateWithPassword(ClinicBuilder, { id, password, encryptedPassword }));
    }

   async createAnamnesisBuilder(id?: string): Promise<AnamnesisBuilder> {
      return Promise.resolve(this.createOrRehydrate(AnamnesisBuilder, { id }));
    }
   async createExamBuilder(id?: string): Promise<ExamBuilder> {
      return Promise.resolve(this.createOrRehydrate(ExamBuilder, { id }));
    }
   async createReportBuilder(id?: string): Promise<ReportBuilder> {
      return Promise.resolve(this.createOrRehydrate(ReportBuilder, { id }));
    }

}