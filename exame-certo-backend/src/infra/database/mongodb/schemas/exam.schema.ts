import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ExamValues } from '../../../../domain/value-objects/exam-values.vo';
import { ReferenceValues } from '../../../../domain/value-objects/reference-values.vo';
import { TUSSCode } from '../../../../domain/value-objects/tuss-code.vo';
import { CBHPMCode } from '../../../../domain/value-objects/cbhpm-code.vo';
import { CIEFASCode } from '../../../../domain/value-objects/ciefas-code.vo';
import { CBHPMCodeSchema } from './cbhpm-code.schema';
import { CIEFASCodeSchema } from './ciefas-code.schema';
import { TUSSCodeSchema } from './tuss-code.schema';
import { ExamValuesSchema } from './exam-values.schema';
import { ReferenceValuesSchema } from './reference-values.schema';

@Schema({ timestamps: true })
export class Exam extends Document {
  @Prop({ required: true, unique: true })
  id: string; // UUID

  @Prop({ type: Types.ObjectId, ref: 'Patient' })
  patient: string;

  @Prop({ type: Types.ObjectId, ref: 'Clinic' })
  clinic: string;

  @Prop({ type: Types.ObjectId, ref: 'Doctor' })
  doctor: string;

  @Prop([{ type: Types.ObjectId, ref: 'Report' }])
  reports: string[];

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  type: string;

  @Prop()
  method: string;

  @Prop({ type: ExamValuesSchema })
  valuesObtained: ExamValues;

  @Prop({ type: ReferenceValuesSchema })
  referenceValues: ReferenceValues;

  @Prop([String])
  images: string[];

  @Prop({ type: TUSSCodeSchema })
  TUSSCode: TUSSCode;

  @Prop({ type: CBHPMCodeSchema })
  CBHPMCode: CBHPMCode;

  @Prop({ type: CIEFASCodeSchema })
  CIEFASCode: CIEFASCode;

  @Prop()
  clinicalHistory: string;

  @Prop()
  mainComplaint: string;
}

export const ExamSchema = SchemaFactory.createForClass(Exam);
