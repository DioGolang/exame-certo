import { RegisteredPatientEventDto } from '../dto/registered-patient-event.dto';

export class RegisteredPatientEvent {
  constructor(
    public readonly createPatientEventDto: RegisteredPatientEventDto,
  ) {}
}
