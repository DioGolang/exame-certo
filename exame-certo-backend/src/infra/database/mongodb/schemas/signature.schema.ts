import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SignatureDocument = HydratedDocument<Signature>;

@Schema()
export class Signature {
  @Prop({ required: true })
  doctorName: string;

  @Prop({ required: true })
  registrationNumber: string;

  @Prop({ required: true })
  signatureData: string;
}

export const SignatureSchema = SchemaFactory.createForClass(Signature);
