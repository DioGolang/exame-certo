import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CNHDocument = HydratedDocument<CNH>;

@Schema()
export class CNH {
  @Prop({ required: true })
  cnh: string;
}

export const CNHSchema = SchemaFactory.createForClass(CNH);
