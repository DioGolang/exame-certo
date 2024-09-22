import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReferenceValuesDocument = HydratedDocument<ReferenceValues>;

@Schema()
export class ReferenceValues {
  @Prop({ required: true })
  parameter: string;

  @Prop({ required: true })
  lowerLimit: number;

  @Prop({ required: true })
  upperLimit: number;

  @Prop()
  unit: number;
}

export const ReferenceValuesSchema =
  SchemaFactory.createForClass(ReferenceValues);
