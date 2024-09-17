import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ReferenceValues extends Document {
  @Prop({ required: true })
  minValue: number;

  @Prop({ required: true })
  maxValue: number;

  @Prop({ required: true })
  unit: string;
}

export const ReferenceValuesSchema =
  SchemaFactory.createForClass(ReferenceValues);
