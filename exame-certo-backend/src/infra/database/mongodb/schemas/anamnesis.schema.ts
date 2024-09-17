import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Identification } from '../../../../domain/value-objects/identification.vo';
import { PersonalHistory } from '../../../../domain/value-objects/personal-history.vo';
import { Medicine } from '../../../../domain/value-objects/medicine.vo';
import { IdentificationSchema } from './identification.schema';
import { PersonalHistorySchema } from './personal-history.schema';

@Schema({ timestamps: true })
export class Anamnesis extends Document {
  @Prop({ required: true, unique: true })
  id: string; // UUID

  @Prop({ type: Types.ObjectId, ref: 'Patient', required: true })
  patient: string;

  @Prop({ type: Types.ObjectId, ref: 'Doctor', required: true })
  doctor: string;

  @Prop({ type: Types.ObjectId, ref: 'Clinic', required: true })
  clinic: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ type: IdentificationSchema })
  identification: Identification;

  @Prop()
  mainComplaint: string;

  @Prop()
  historyOfPresentIllness: string;

  @Prop()
  reviewOfSystems: string;

  @Prop()
  pastMedicalHistory: string;

  @Prop()
  familyHistory: string;

  @Prop()
  socialHistory: string;

  @Prop({ type: PersonalHistorySchema })
  personalHistory: PersonalHistory;

  @Prop()
  medicines: Medicine[];
}

export const AnamnesisSchema = SchemaFactory.createForClass(Anamnesis);
