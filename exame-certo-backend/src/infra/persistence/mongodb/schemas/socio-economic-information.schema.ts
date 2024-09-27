import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SocioEconomicInformationDocument =
  HydratedDocument<SocioEconomicInformation>;

@Schema()
export class SocioEconomicInformation {
  @Prop({ required: true })
  profession: string;

  @Prop({ required: true })
  educationLevel: string;

  @Prop({ required: true })
  housingConditions: string;

  @Prop()
  incomeLevel: string;

  @Prop()
  socialSupport: string;
}

export const SocioEconomicInformationSchema = SchemaFactory.createForClass(
  SocioEconomicInformation,
);
