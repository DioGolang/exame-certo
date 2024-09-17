import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class PersonalHistory {
  @Prop({ required: true })
  history: string;

  @Prop()
  notes: string;
}

export const PersonalHistorySchema =
  SchemaFactory.createForClass(PersonalHistory);
