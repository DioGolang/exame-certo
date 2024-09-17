import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SocioEconomicInformation extends Document {
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
