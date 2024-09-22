import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CIEFASCodeDocument = HydratedDocument<CIEFASCode>;

@Schema()
export class CIEFASCode {
  @Prop({ required: true })
  code: string;

  @Prop()
  description: string;
}

export const CIEFASCodeSchema = SchemaFactory.createForClass(CIEFASCode);
