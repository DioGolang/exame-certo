import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { TypeProcedure } from '../../../../domain/enums/type-procedure.interface';
import { ProcedureStatus } from '../../../../domain/enums/procedure-status.enum';
import { Service } from './service.schema';

export type ProcedureDocument = HydratedDocument<Procedure>;

@Schema()
export class Procedure {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: String, enum: TypeProcedure })
  typeProcedure: TypeProcedure;

  @Prop({ required: true, type: String, enum: ProcedureStatus })
  procedureStatus: ProcedureStatus;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
  })
  service: Service;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}
export const ProcedureSchema = SchemaFactory.createForClass(Procedure);
