import { Body, Controller, Post } from '@nestjs/common';
import { AttendantService } from '../../../../application/attendant/services/Attendant.service';
import { RegisterAttendantDto } from '../../../../application/attendant/dto/register-attendant.dto';

@Controller('attendants')
export class AttendantController {
  constructor(private readonly attendantsService: AttendantService) {}

  @Post()
  async createAttendant(
    @Body() attendant: RegisterAttendantDto,
  ): Promise<void> {
    await this.attendantsService.registerAttendant(attendant);
  }
}
