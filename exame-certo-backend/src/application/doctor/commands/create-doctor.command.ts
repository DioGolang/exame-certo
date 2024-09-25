import { CreateDoctorDto } from '../dto/create-doctor.dto';

export class CreateDoctorCommand {
  constructor(public readonly createDoctorDto: CreateDoctorDto) {}
}
