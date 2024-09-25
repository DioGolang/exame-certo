import { CommandRepository } from './command-repository.interface';
import { CreateReportDto } from '../../application/dtos/create-report.dto';
import { ReportEntity } from '../../infra/persistence/postgres/entities/report.entity';

export interface ReportRepository
  extends CommandRepository<CreateReportDto, ReportEntity> {
  save(report: CreateReportDto): Promise<void>;
  update(report: CreateReportDto): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<ReportEntity | null>;
  findAll(): Promise<ReportEntity[]>;
}
