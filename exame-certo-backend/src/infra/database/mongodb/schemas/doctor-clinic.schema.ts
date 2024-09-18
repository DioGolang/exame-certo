import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { Doctor } from './doctor.schema';
import { Clinic } from './clinic.schema';

export type DoctorClinicDocument = HydratedDocument<DoctorClinic>;

@Schema()
export class DoctorClinic extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Doctor', required: true })
  doctor: Doctor;

  @Prop({ type: Types.ObjectId, ref: 'Clinic', required: true })
  clinic: Clinic;

  @Prop({ required: true })
  associatedAt: Date;

  @Prop({})
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const DoctorClinicSchema = SchemaFactory.createForClass(DoctorClinic);
