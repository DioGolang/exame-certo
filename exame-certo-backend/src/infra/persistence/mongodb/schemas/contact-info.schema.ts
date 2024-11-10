import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContactInfoDocument = HydratedDocument<ContactInfo>;

@Schema()
export class ContactInfo {
  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  emergencyPhone: string;

  @Prop({ required: true })
  emergencyPhone2: string;

  @Prop({ required: true })
  emergencyPhone3: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  extension?: string;

  @Prop()
  extension2?: string;

  @Prop()
  extension3?: string;
}

export const ContactInfoSchema = SchemaFactory.createForClass(ContactInfo);
