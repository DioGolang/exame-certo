import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Documentation extends Document {
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
