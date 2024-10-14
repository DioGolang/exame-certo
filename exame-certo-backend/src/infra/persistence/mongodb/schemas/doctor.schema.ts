import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ContactInfo, ContactInfoSchema } from './contact-info.schema';
import { Address, AddressSchema } from './address.schema';
import * as mongoose from 'mongoose';
import { Anamnesis } from './anamnesis.schema';
import { Exam } from './exam.schema';
import { Clinic } from './clinic.schema';
import { Report } from './report.schema';

export type DoctorDocument = HydratedDocument<Doctor>;

@Schema()
export class Doctor {
  @Prop({ required: true, unique: true })
  id: string; // UUID

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ type: ContactInfoSchema })
  contactInfo: ContactInfo;

  @Prop({ type: AddressSchema })
  address: Address;

  @Prop({ required: true, unique: true })
  registrationNumber: string;

  @Prop({ required: true })
  specialization: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Anamnesis' }] })
  anamnesis: Anamnesis[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }] })
  exams: Exam[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }] })
  reports: Report[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Clinic' }] })
  clinics: Clinic[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
