import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { AppointmentStatus } from '../../../../domain/enums/appointment-status.enum';
import { Patient } from './patient.schema';
import { Doctor } from './doctor.schema';
import { Attendant } from './attendant.schema';

export type SchedulingDocument = HydratedDocument<Scheduling>;

@Schema()
export class Scheduling {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  typeConsultation: string;

  @Prop({ required: true })
  consultationLocation: string;

  @Prop({ required: true, type: String, enum: AppointmentStatus })
  appointmentStatus: AppointmentStatus;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
  })
  patient: Patient;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' })
  doctor: Doctor;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Attendant' })
  attendant: Attendant;

  @Prop()
  typeExam: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}
export const SchedulingSchema = SchemaFactory.createForClass(Scheduling);
