import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Address } from '../../../../domain/value-objects/address.vo';
import { ContactInfo } from '../../../../domain/value-objects/contact-info.vo';
import { HydratedDocument } from 'mongoose';
import { AddressSchema } from './address.schema';
import { ContactInfoSchema } from './contact-info.schema';
import * as mongoose from 'mongoose';
import { Anamnesis } from './anamnesis.schema';
import { Exam } from './exam.schema';
import { Patient } from './patient.schema';
import { Doctor } from './doctor.schema';
import { EmailSchema } from './email.schema';
import { Email } from '../../../../domain/value-objects/email.vo';

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
