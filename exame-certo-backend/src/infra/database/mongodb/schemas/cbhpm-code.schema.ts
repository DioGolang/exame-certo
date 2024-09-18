import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type CBHPMCodeDocument = HydratedDocument<CBHPMCode>;

@Schema()
export class CBHPMCode extends Document {
  @Prop({ required: true })
  code: string;

  @Prop()
  description: string;
}

export const CBHPMCodeSchema = SchemaFactory.createForClass(CBHPMCode);
