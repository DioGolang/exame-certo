import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CPFDocument = HydratedDocument<CPF>;

@Schema()
export class CPF {
  @Prop({ required: true })
  cpf: string;
}

export const CPFSchema = SchemaFactory.createForClass(CPF);
