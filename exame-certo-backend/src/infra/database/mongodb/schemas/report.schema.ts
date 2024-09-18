import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CID10 } from '../../../../domain/value-objects/cid.vo';
import { Signature } from '../../../../domain/value-objects/signature.vo';
import { AdditionalInformation } from '../../../../domain/value-objects/additional-information.vo';
import * as mongoose from 'mongoose';
import { Exam } from './exam.schema';
import { CID10Schema } from './cid.schema';
import { AdditionalInformationSchema } from './additional-information.schema';
import { SignatureSchema } from './signature.schema';

export type ReportDocument = HydratedDocument<Report>;

@Schema()
export class Report {
  @Prop({ required: true, unique: true })
  id: string; // UUID

  @Prop({ required: true })
  tenant_id: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }] })
  exams: Exam[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true })
  doctor: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  diagnosis: string;

  @Prop({ type: CID10Schema })
  CID10: CID10[];

  @Prop()
  justification: string;

  @Prop()
  conduct: string;

  @Prop()
  hypothesis: string;

  @Prop({ type: AdditionalInformationSchema })
  additionalInformation: AdditionalInformation;

  @Prop({ type: SignatureSchema })
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

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
