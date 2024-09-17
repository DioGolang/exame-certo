import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ContactInfo } from '../../../../domain/value-objects/contact-info.vo';
import { Address } from '../../../../domain/value-objects/address.vo';
import { ContactInfoSchema } from './contact-info.schema';
import { AddressSchema } from './address.schema';

@Schema({ timestamps: true })
export class Doctor extends Document {
  @Prop({ required: true, unique: true })
  id: string; // UUID

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ type: ContactInfoSchema })
  contactInfo: ContactInfo;

  @Prop({ type: AddressSchema })
  professionalAddress: Address;

  @Prop()
  registrationNumber: string;

  @Prop()
  specialization: string;

  @Prop([{ type: Types.ObjectId, ref: 'Anamnesis' }])
  anamnesis: string[];

  @Prop([{ type: Types.ObjectId, ref: 'Exam' }])
  exams: string[];

  @Prop([{ type: Types.ObjectId, ref: 'Report' }])
  reports: string[];

  @Prop([{ type: Types.ObjectId, ref: 'Clinic' }])
  clinics: string[];
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
