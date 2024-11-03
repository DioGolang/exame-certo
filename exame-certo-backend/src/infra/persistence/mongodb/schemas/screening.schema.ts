import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Patient } from './patient.schema';
import { Nursing } from './nursing.schema';
import { Anamnesis } from './anamnesis.schema';

export type ScreeningDocument = HydratedDocument<Screening>;

@Schema()
export class Screening {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' })
  patient: Patient;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Nursing' })
  nursing: Nursing;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Anamnesis' })
  anamnesis: Anamnesis;

  @Prop()
  obs: string;

  @Prop()
  data: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}
export const ScreeningSchema = SchemaFactory.createForClass(Screening);
