import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CNSDocument = HydratedDocument<CNS>;

@Schema()
export class CNS {
  @Prop({ required: true, unique: true })
  cns: string;
}

export const CNSSchema = SchemaFactory.createForClass(CNS);
