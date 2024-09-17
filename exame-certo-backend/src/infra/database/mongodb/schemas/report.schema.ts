import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CID10 } from '../../../../domain/value-objects/cid.vo';
import { Signature } from '../../../../domain/value-objects/signature.vo';
import { AdditionalInformation } from '../../../../domain/value-objects/additional-information.vo';

@Schema({ timestamps: true })
export class Report extends Document {
  @Prop({ required: true, unique: true })
  id: string; // UUID

  @Prop({ required: true })
  tenant_id: string;

  @Prop({ type: [{ type: String, ref: 'Exam' }] })
  exams: string[];

  @Prop({ type: String, ref: 'Doctor', required: true })
  doctor: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  diagnosis: string;

  @Prop()
  CID10: CID10[];

  @Prop()
  justification: string;

  @Prop()
  conduct: string;

  @Prop()
  hypothesis: string;

  @Prop()
  additionalInformation: AdditionalInformation;

  @Prop()
  signature: Signature;

  @Prop()
  prognosis: string;

  @Prop()
  restStartDate: Date;

  @Prop()
  restDuration: Date;

  @Prop()
  therapeuticConduct: string;

  @Prop()
  clinicalEvolution: string;

  @Prop()
  healthConsequences: string;

  @Prop()
  consultationReason: string;

  @Prop()
  illnessHistory: string;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
