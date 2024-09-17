import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CBHPMCode extends Document {
  @Prop({ required: true })
  code: string;

  @Prop()
  description: string;
}

export const CBHPMCodeSchema = SchemaFactory.createForClass(CBHPMCode);
