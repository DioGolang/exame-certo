import { CreatePatientDto } from '../dto/create-patient.dto';

export class CreatePatientCommand {
  constructor(public readonly createPatientDto: CreatePatientDto) {}
}
