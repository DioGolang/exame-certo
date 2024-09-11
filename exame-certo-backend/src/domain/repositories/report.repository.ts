import { Report } from '../entities/report.entity';
import { Repository } from '../interfaces/repository.interface';

export interface ReportRepository extends Repository<Report> {
  save(report: Report): Promise<void>;
  update(report: Report): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Report | null>;
  findAll(): Promise<Report[]>;
}
