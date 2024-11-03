import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Address, AddressSchema } from './address.schema';
import { ContactInfo, ContactInfoSchema } from './contact-info.schema';
import { Column } from 'typeorm';
import mongoose, { HydratedDocument } from 'mongoose';
import { Scheduling } from './scheduling.schema';

export type AttendantDocument = HydratedDocument<Attendant>;

@Schema()
export class Attendant {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  department: string;

  @Prop({ type: AddressSchema })
  address: Address;

  @Prop({ type: ContactInfoSchema })
  contactInfo: ContactInfo;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scheduling' }] })
  scheduling: Scheduling[];

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;
}
export const AttendantSchema = SchemaFactory.createForClass(Attendant);
