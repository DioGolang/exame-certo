import { RegisterPatientDto } from '../dto/register-patient.dto';

export class RegisterPatientCommand {
  constructor(public readonly registerPatientDto: RegisterPatientDto) {}
}
