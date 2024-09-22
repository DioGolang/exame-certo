import { CreateClinicDto } from '../dto/create-clinic.dto';

export class CreateClinicCommand{
  constructor(public readonly createClinicDto: CreateClinicDto) {
  }
}
