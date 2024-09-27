import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CPF } from '../../../../domain/value-objects/cpf.vo';
import { RG } from '../../../../domain/value-objects/rg.vo';
import { CNH } from '../../../../domain/value-objects/cnh.vo';
import { CNS } from '../../../../domain/value-objects/cns.vo';
import { CPFSchema } from './cpf.schema';
import { CNHSchema } from './cnh.schema';
import { CNSSchema } from './cns.schema';
import { RGSchema } from './rg.schema';

export type DocumentationDocument = HydratedDocument<Documentation>;

@Schema()
export class Documentation {
  @Prop({ type: CPFSchema, required: true })
  cpf: CPF;

  @Prop({ type: RGSchema, required: true })
  rg: RG;

  @Prop({ type: CNHSchema })
  cnh: CNH;

  @Prop({ type: CNSSchema })
  cns: CNS;
}

export const DocumentationSchema = SchemaFactory.createForClass(Documentation);
