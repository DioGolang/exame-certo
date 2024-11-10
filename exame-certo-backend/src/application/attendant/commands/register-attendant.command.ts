import { RegisterAttendantDto } from '../dto/register-attendant.dto';

export class RegisterAttendantCommand {
  constructor(public readonly registerAttendantDto: RegisterAttendantDto) {}
}