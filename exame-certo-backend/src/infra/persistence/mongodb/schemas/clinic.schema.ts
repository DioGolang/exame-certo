import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Address, AddressSchema } from './address.schema';
import { ContactInfo, ContactInfoSchema } from './contact-info.schema';
import * as mongoose from 'mongoose';
import { Anamnesis } from './anamnesis.schema';
import { Exam } from './exam.schema';
import { Patient } from './patient.schema';
import { Doctor } from './doctor.schema';

export type ClinicDocument = HydratedDocument<Clinic>;

@Schema()
export class Clinic {
  @Prop({ required: true, unique: true, type: String })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: AddressSchema })
  address: Address;

  @Prop({ type: ContactInfoSchema })
  contactInfo: ContactInfo;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }] })
  doctors: Doctor[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }] })
  patients: Patient[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }] })
  exams: Exam[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Anamnesis' }] })
  anamnesis: Anamnesis[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ClinicSchema = SchemaFactory.createForClass(Clinic);
