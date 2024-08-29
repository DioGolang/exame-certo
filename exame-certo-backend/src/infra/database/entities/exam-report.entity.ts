import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExamEntity } from "./exam.entity";
import { ReportEntity } from "./report.entity";


@Entity('exam_report')
export class ExamReportEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => ExamEntity, exam => exam.reports)
  exam: ExamEntity;

  @ManyToOne(() => ReportEntity, report => report.exams)
  report: ReportEntity;
}