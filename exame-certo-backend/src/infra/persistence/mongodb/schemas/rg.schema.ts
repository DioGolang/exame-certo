import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RGDocument = HydratedDocument<RG>;

@Schema()
export class RG {
  @Prop({ required: true, unique: true })
  rg: string;
}

export const RGSchema = SchemaFactory.createForClass(RG);
