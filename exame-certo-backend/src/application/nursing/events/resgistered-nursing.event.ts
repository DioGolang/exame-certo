import { RegisteredNursingEventDto } from '../dto/registered-nursing-event.dto';

export class RegisteredNursingEvent {
  constructor(
    public readonly registeredNursingEventDto: RegisteredNursingEventDto,
  ) {}
}
