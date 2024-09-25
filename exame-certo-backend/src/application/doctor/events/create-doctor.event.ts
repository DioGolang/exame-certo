import { CreateDoctorEventDto } from '../dto/create-doctor-event.dto';

export class CreateDoctorEvent {
  constructor(public readonly createDoctorEventDto: CreateDoctorEventDto) {}
}
