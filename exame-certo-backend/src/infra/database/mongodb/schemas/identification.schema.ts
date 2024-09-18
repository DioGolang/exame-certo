import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Sex } from '../../../../domain/enums/sex.enum';
import { Ethnicity } from '../../../../domain/enums/ethnicity.enum';
import { MaritalStatus } from '../../../../domain/enums/marital-status.enum';
import { EducationLevel } from '../../../../domain/enums/education-level.enum';
import { Religion } from '../../../../domain/enums/religion.enum';
import { Naturalness } from '../../../../domain/enums/naturalness.enum';
import { Address, AddressSchema } from './address.schema';
import { ContactInfo, ContactInfoSchema } from './contact-info.schema';

export type IdentificationDocument = HydratedDocument<Identification>;

@Schema()
export class Identification {
  @Prop({ required: true })
  name: string;

  @Prop()
  dateOfBirth: Date;

  @Prop({ type: String, enum: Sex })
  sex: Sex;

  @Prop({ type: String, enum: Ethnicity })
  ethnicity: string;

  @Prop({ type: String, enum: MaritalStatus })
  maritalStatus: MaritalStatus;

  @Prop({ type: String, enum: EducationLevel })
  educationLevel: EducationLevel;

  @Prop({ type: String, enum: Religion })
  religion: string;

  @Prop({ type: String, enum: Naturalness })
  naturalness: Naturalness;

  @Prop()
  profession: string;

  @Prop({ type: AddressSchema })
  address: Address;

  @Prop({ type: ContactInfoSchema })
  contactInfo: ContactInfo;
}

export const IdentificationSchema =
  SchemaFactory.createForClass(Identification);
