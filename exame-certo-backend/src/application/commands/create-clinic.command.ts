import { CreateClinicDto } from '../dtos/create-clinic.dto';

export class CreateClinicCommand {
  constructor(public readonly createClinicDto: CreateClinicDto) {}
}
