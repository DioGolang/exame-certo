import { CreateClinicEventDto } from '../dtos/create-clinic-event.dto';

export class ClinicCreatedEvent {
  constructor(public readonly clinic: CreateClinicEventDto) {}
}
