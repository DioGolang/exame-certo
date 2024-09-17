import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ContactInfo extends Document {
  @Prop({ required: true })
  phone: string;

  @Prop()
  email: string;
}

export const ContactInfoSchema = SchemaFactory.createForClass(ContactInfo);
