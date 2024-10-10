import { AnamnesisBuilder } from './anamnesisBuilder';
import { ExamBuilder } from './examBuilder';
import { ReportBuilder } from './reportBuilder';

export abstract class BuilderFactory {
  abstract createAnamnesisBuilder(id?: string): Promise<AnamnesisBuilder>;
  abstract createExamBuilder(id?: string): Promise<ExamBuilder>;
  abstract createReportBuilder(id?: string): Promise<ReportBuilder>;
}
