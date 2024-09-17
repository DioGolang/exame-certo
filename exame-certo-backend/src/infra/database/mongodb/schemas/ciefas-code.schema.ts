import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CIEFASCode extends Document {
  @Prop({ required: true })
  code: string;

  @Prop()
  description: string;
}

export const CIEFASCodeSchema = SchemaFactory.createForClass(CIEFASCode);
