import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Exam } from './exam.schema';
import { Report } from './report.schema';

@Schema({ timestamps: true })
export class ExamReport extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Exam', required: true })
  exam: Exam;

  @Prop({ type: Types.ObjectId, ref: 'Report', required: true })
  report: Report;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const ExamReportSchema = SchemaFactory.createForClass(ExamReport);
