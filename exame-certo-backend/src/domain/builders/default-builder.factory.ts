import { AnamnesisBuilder } from './anamnesisBuilder';
import { BuilderFactory } from './builder.factory';
import { ExamBuilder } from './examBuilder';

import { ReportBuilder } from './reportBuilder';

export class DefaultBuilderFactory extends BuilderFactory {
  async createAnamnesisBuilder(id?: string): Promise<AnamnesisBuilder> {
    return this.buildWithoutLogin(AnamnesisBuilder, { id });
  }

  async createExamBuilder(id?: string): Promise<ExamBuilder> {
    return this.buildWithoutLogin(ExamBuilder, { id });
  }

  async createReportBuilder(id?: string): Promise<ReportBuilder> {
    return this.buildWithoutLogin(ReportBuilder, { id });
  }

  private async buildWithoutLogin<T>(
    BuilderClass: { create: () => T; rehydrate: (id: string) => T },
    entity: { id?: string },
  ): Promise<T> {
    return entity.id
      ? BuilderClass.rehydrate(entity.id)
      : BuilderClass.create();
  }

  private async buildWithLogin<T>(
    BuilderClass: {
      create: (password?: string) => T;
      rehydrate: (id: string, encryptedPassword?: string) => T;
    },
    entity: { id?: string; password?: string; encryptedPassword?: string },
  ): Promise<T> {
    return entity.id
      ? BuilderClass.rehydrate(entity.id, entity.encryptedPassword!)
      : BuilderClass.create(entity.password!);
  }
}
