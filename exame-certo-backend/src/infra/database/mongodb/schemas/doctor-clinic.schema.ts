import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Doctor } from './doctor.schema';
import { Clinic } from './clinic.schema';

@Schema({ timestamps: true })
export class DoctorClinic extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Doctor', required: true })
  doctor: Doctor;

  @Prop({ type: Types.ObjectId, ref: 'Clinic', required: true })
  clinic: Clinic;

  @Prop({ type: Date, default: Date.now })
  associatedAt: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const DoctorClinicSchema = SchemaFactory.createForClass(DoctorClinic);
