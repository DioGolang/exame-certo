import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ExamValues extends Document {
  @Prop({ required: true })
  value: string;

  @Prop()
  unit: string;
}

export const ExamValuesSchema = SchemaFactory.createForClass(ExamValues);
