import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class PatientClinic {
  @Prop({ required: true, unique: true })
  id: string; // UUID

  @Prop({ type: Types.ObjectId, ref: 'Patient', required: true })
  patient: string;

  @Prop({ type: Types.ObjectId, ref: 'Clinic', required: true })
  clinic: string;

  @Prop({ default: true })
  authorized: boolean;

  @Prop({ required: true })
  authorizedAt: Date;
}

export const PatientClinicSchema = SchemaFactory.createForClass(PatientClinic);
PatientClinicSchema.index({ patient: 1, clinic: 1 }, { unique: true });
