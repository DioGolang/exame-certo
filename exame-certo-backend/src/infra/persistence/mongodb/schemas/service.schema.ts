import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Patient } from './patient.schema';
import { Consultation } from './consultation.schema';
import { TypeService } from '../../../../domain/enums/type-service.enum';
import { ServiceStatus } from '../../../../domain/enums/service-status.enum';
import { ManchesterProtocol } from '../../../../domain/enums/manchester-protocol.enum';

export type ServiceDocument = HydratedDocument<Service>;

@Schema()
export class Service {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
  })
  patient: Patient;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Consultation' }],
  })
  consultation: Consultation[];

  @Prop({ required: true, type: String, enum: TypeService })
  typeService: TypeService;

  @Prop({ required: true, type: String, enum: ServiceStatus })
  serviceStatus: ServiceStatus;

  @Prop({ required: true, type: String, enum: ManchesterProtocol })
  priority: ManchesterProtocol;

  @Prop()
  servicePassword: string;

  @Prop()
  arrivalTime: Date;

  @Prop()
  isEmergency: boolean;

  @Prop()
  description: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}
export const ServiceSchema = SchemaFactory.createForClass(Service);
