import { CreateClinicEventDto } from '../dto/create-clinic-event.dto';

export class CreateClinicEvent {
  constructor(public readonly createClinicEventDto: CreateClinicEventDto) {}
}
