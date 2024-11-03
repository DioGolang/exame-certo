import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Address, AddressSchema } from './address.schema';
import { ContactInfo, ContactInfoSchema } from './contact-info.schema';
import { NursingLevel } from '../../../../domain/enums/nursing-level.enum';
import { Anamnesis } from './anamnesis.schema';
import { Scheduling } from './scheduling.schema';

export type NursingDocument = HydratedDocument<Nursing>;

@Schema()
export class Nursing {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, type: String, enum: NursingLevel })
  nursingLevel: NursingLevel;

  @Prop()
  COREN?: string;

  @Prop({ type: AddressSchema })
  address: Address;

  @Prop({ type: ContactInfoSchema })
  contactInfo: ContactInfo;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Anamnesis' }] })
  anamnesis: Anamnesis[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scheduling' }] })
  scheduling: Scheduling[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}
export const NursingSchema = SchemaFactory.createForClass(Nursing);
