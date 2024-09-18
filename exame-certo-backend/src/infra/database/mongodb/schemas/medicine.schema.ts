import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MedicineDocument = HydratedDocument<Medicine>;

@Schema()
export class Medicine {
  @Prop({ required: true })
  name: string;

  @Prop()
  dosage: string;

  @Prop()
  frequency: string;

  @Prop()
  viaAdministration: string;

  @Prop()
  duration: string;

  @Prop()
  observations: string;

  @Prop()
  prescriptionDate: Date;
}

export const MedicineSchema = SchemaFactory.createForClass(Medicine);
