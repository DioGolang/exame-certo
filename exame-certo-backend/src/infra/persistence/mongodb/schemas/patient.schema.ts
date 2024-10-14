import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Address, AddressSchema } from './address.schema';
import { ContactInfo, ContactInfoSchema } from './contact-info.schema';
import { Documentation } from '../../../../domain/value-objects/documentation.vo';
import { SocioEconomicInformation } from '../../../../domain/value-objects/socio-economic-information.vo';
import { DocumentationSchema } from './documentation.schema';
import { SocioEconomicInformationSchema } from './socio-economic-information.schema';
import mongoose from 'mongoose';
import { Anamnesis } from './anamnesis.schema';
import { Exam } from './exam.schema';
import { Clinic } from './clinic.schema';
import { Sex } from '../../../../domain/enums/sex.enum';
import { MaritalStatus } from '../../../../domain/enums/marital-status.enum';

export type PatientDocument = HydratedDocument<Patient>;

@Schema()
export class Patient {
  @Prop({ required: true, unique: true })
  id: string; // UUID

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop()
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  dateOfBirth: Date;

  @Prop({ type: String, enum: Sex })
  sex: Sex;

  @Prop({ type: String, enum: MaritalStatus })
  maritalStatus: MaritalStatus;

  @Prop({ type: AddressSchema })
  address: Address;

  @Prop({ type: ContactInfoSchema })
  contactInfo: ContactInfo;

  @Prop({ type: DocumentationSchema })
  documentation: Documentation;

  @Prop({ type: SocioEconomicInformationSchema })
  socioeconomicInformation: SocioEconomicInformation;

  @Prop()
  healthInsurance: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Anamnesis' }] })
  anamnesis: Anamnesis[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }] })
  exams: Exam[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Clinic' }] })
  clinics: Clinic[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
