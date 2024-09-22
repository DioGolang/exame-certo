import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Exam } from './exam.schema';
import { Report } from './report.schema';

export type ExamReportDocument = HydratedDocument<ExamReport>;

@Schema()
export class ExamReport {
  @Prop({ type: Types.ObjectId, ref: 'Exam', required: true })
  exam: Exam;

  @Prop({ type: Types.ObjectId, ref: 'Report', required: true })
  report: Report;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ExamReportSchema = SchemaFactory.createForClass(ExamReport);
