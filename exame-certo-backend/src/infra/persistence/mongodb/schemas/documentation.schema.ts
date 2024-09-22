import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DocumentationDocument = HydratedDocument<Documentation>;

@Schema()
export class Documentation {
  @Prop({ required: true })
  documentType: string;

  @Prop({ required: true })
  documentNumber: string;

  @Prop()
  issueDate: Date;

  @Prop()
  expiryDate: Date;
}

export const DocumentationSchema = SchemaFactory.createForClass(Documentation);
