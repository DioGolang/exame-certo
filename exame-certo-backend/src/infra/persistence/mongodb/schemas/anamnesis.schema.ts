import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Identification } from '../../../../domain/value-objects/identification.vo';
import { PersonalHistory } from '../../../../domain/value-objects/personal-history.vo';
import { Medicine } from '../../../../domain/value-objects/medicine.vo';
import { IdentificationSchema } from './identification.schema';
import { PersonalHistorySchema } from './personal-history.schema';
import * as mongoose from 'mongoose';
import { Doctor } from './doctor.schema';
import { Clinic } from './clinic.schema';
import { Patient } from './patient.schema';
import { MedicineSchema } from './medicine.schema';

export type AnamnesisDocument = HydratedDocument<Anamnesis>;

@Schema()
export class Anamnesis {
  @Prop({ required: true, unique: true })
  id: string; // UUID

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  })
  patient: Patient;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true })
  doctor: Doctor;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true })
  clinic: Clinic;

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

  @Prop({ type: MedicineSchema })
  medicines: Medicine[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const AnamnesisSchema = SchemaFactory.createForClass(Anamnesis);
