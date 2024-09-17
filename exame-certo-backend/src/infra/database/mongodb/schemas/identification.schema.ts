import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Identification extends Document {
  @Prop({ required: true })
  idNumber: string;

  @Prop({ required: true })
  type: string; // e.g., passport, national ID, etc.
}

export const IdentificationSchema =
  SchemaFactory.createForClass(Identification);
