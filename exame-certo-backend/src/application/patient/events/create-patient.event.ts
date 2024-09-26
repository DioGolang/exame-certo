import { CreatePatientEventDto } from '../dto/create-patient-event.dto';

export class CreatePatientEvent {
  constructor(public readonly createPatientEventDto: CreatePatientEventDto) {}
}
