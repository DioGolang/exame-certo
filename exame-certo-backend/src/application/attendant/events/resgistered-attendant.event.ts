import { RegisteredAttendantEventDto } from '../dto/registered-attendant-event.dto';

export class RegisteredAttendantEvent {
  constructor(
    public readonly registeredAttendantEventDto: RegisteredAttendantEventDto,
  ) {}
}