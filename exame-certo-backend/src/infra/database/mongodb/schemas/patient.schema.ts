import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Address, AddressSchema } from './address.schema';
import { ContactInfo, ContactInfoSchema } from './contact-info.schema';
import { Documentation } from '../../../../domain/value-objects/documentation.vo';
import { SocioEconomicInformation } from '../../../../domain/value-objects/socio-economic-information.vo';
import { DocumentationSchema } from './documentation.schema';
import { SocioEconomicInformationSchema } from './socio-economic-information.schema';

@Schema({ timestamps: true })
export class Patient extends Document {
  @Prop({ required: true, unique: true })
  id: string; // UUID

  @Prop({ required: true })
  name: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  passwordHash: string;

  @Prop()
  dateOfBirth: Date;

  @Prop()
  sex: string; // Considerar enum para sexo

  @Prop()
  maritalStatus: string; // Enum para estado civil

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

  @Prop([{ type: Types.ObjectId, ref: 'Anamnesis' }])
  anamnesis: string[];

  @Prop([{ type: Types.ObjectId, ref: 'Exam' }])
  exams: string[];

  @Prop([{ type: Types.ObjectId, ref: 'Clinic' }])
  clinics: string[];
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
