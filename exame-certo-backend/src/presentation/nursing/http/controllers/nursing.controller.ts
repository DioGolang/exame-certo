import { Body, Controller, Post } from '@nestjs/common';
import { NursingService } from '../../../../application/nursing/services/nursing.service';
import { RegisterNursingDto } from '../../../../application/nursing/dto/register-nursing.dto';

@Controller('nursing')
export class NursingController {
  constructor(private readonly nursingService: NursingService) {}

  @Post()
  async createNursing(@Body() nursing: RegisterNursingDto): Promise<void> {
    await this.nursingService.registerNursing(nursing);
  }
}
