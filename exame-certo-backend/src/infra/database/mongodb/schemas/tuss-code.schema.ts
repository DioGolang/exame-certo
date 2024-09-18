import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TUSSCodeDocument = HydratedDocument<TUSSCode>;

@Schema()
export class TUSSCode {
  @Prop({ required: true })
  code: string;

  @Prop()
  description: string;
}

export const TUSSCodeSchema = SchemaFactory.createForClass(TUSSCode);
