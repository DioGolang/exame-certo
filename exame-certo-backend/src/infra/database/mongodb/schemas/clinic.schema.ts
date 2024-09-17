import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Address } from '../../../../domain/value-objects/address.vo';
import { ContactInfo } from '../../../../domain/value-objects/contact-info.vo';

@Schema()
export class Clinic extends Document {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  address: Address;

  @Prop()
  contactInfo: ContactInfo;

  @Prop({ type: [{ type: String, ref: 'Doctor' }] })
  doctors: string[];

  @Prop({ type: [{ type: String, ref: 'Patient' }] })
  patients: string[];

  @Prop({ type: [{ type: String, ref: 'Exam' }] })
  exams: string[];

  @Prop({ type: [{ type: String, ref: 'Anamnesis' }] })
  anamnesis: string[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ClinicSchema = SchemaFactory.createForClass(Clinic);
