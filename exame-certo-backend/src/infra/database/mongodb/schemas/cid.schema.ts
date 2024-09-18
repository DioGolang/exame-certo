import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CID10Document = HydratedDocument<CID10>;

@Schema()
export class CID10 {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  description: string;
}

export const CID10Schema = SchemaFactory.createForClass(CID10);
