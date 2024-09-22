import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdditionalInformationDocument =
  HydratedDocument<AdditionalInformation>;

@Schema()
export class AdditionalInformation {
  @Prop({ required: true })
  age: number;

  @Prop()
  weight: number;

  @Prop()
  height: number;

  @Prop()
  otherDetails: string;
}

export const AdditionalInformationSchema = SchemaFactory.createForClass(
  AdditionalInformation,
);
