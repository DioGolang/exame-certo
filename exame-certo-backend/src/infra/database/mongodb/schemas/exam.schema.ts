import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
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
import mongoose from 'mongoose';
import { Doctor } from './doctor.schema';
import { Clinic } from './clinic.schema';
import { Patient } from './patient.schema';
import { Report } from './report.schema';

export type ExamDocument = HydratedDocument<Exam>;

@Schema()
export class Exam {
  @Prop({ required: true, unique: true })
  id: string; // UUID

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' })
  patient: Patient;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Clinic' })
  clinic: Clinic;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' })
  doctor: Doctor;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }] })
  reports: Report[];

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

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ExamSchema = SchemaFactory.createForClass(Exam);
