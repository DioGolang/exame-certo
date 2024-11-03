import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { StatusTobeConsulted } from '../../../../domain/enums/status-tobe-consulted.enum';
import { Doctor } from './doctor.schema';
import { Service } from './service.schema';

export type ConsultationDocument = HydratedDocument<Consultation>;

@Schema()
export class Consultation {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop()
  date: Date;

  @Prop()
  reason: string;

  @Prop({ type: String, enum: StatusTobeConsulted })
  statusTobeConsulted: StatusTobeConsulted;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' })
  doctor: Doctor;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Service' })
  service: Service;
}
export const ConsultationSchema = SchemaFactory.createForClass(Consultation);
