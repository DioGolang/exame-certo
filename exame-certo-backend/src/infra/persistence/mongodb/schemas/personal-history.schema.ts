import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PersonalHistoryDocument = HydratedDocument<PersonalHistory>;

@Schema()
export class PersonalHistory {
  @Prop({ required: true })
  pathological: string;

  @Prop({ required: true })
  physiological: string;

  @Prop({ required: true })
  lifestyle: string;

  @Prop()
  gynecoObstetric: string;
}

export const PersonalHistorySchema =
  SchemaFactory.createForClass(PersonalHistory);
