import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TUSSCode extends Document {
  @Prop({ required: true })
  code: string;

  @Prop()
  description: string;
}

export const TUSSCodeSchema = SchemaFactory.createForClass(TUSSCode);
