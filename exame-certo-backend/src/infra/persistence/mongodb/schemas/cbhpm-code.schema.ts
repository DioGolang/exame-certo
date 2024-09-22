import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CBHPMCodeDocument = HydratedDocument<CBHPMCode>;

@Schema()
export class CBHPMCode {
  @Prop({ required: true })
  code: string;

  @Prop()
  description: string;
}

export const CBHPMCodeSchema = SchemaFactory.createForClass(CBHPMCode);
