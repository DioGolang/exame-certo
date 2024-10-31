import { RegisteredPatientEventDto } from '../dto/registered-patient-event.dto';

export class RegisteredPatientEvent {
  constructor(
    public readonly registeredPatientEventDto: RegisteredPatientEventDto,
  ) {}
}
