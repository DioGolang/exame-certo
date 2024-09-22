import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SocioEconomicInformationDocument =
  HydratedDocument<SocioEconomicInformation>;

@Schema()
export class SocioEconomicInformation {
  @Prop({ required: true })
  income: number;

  @Prop({ required: true })
  educationLevel: string;

  @Prop({ required: true })
  employmentStatus: string;

  @Prop()
  housingStatus: string;
}

export const SocioEconomicInformationSchema = SchemaFactory.createForClass(
  SocioEconomicInformation,
);
