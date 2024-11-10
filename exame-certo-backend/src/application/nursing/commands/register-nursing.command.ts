import { RegisterNursingDto } from '../dto/register-nursing.dto';

export class RegisterNursingCommand {
  constructor(public readonly registerNursingDto: RegisterNursingDto) {}
}
