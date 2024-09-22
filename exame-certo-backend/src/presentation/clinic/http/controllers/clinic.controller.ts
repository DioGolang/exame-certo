import { Body, Controller, Post } from '@nestjs/common';
import { CreateClinicDto } from '../../../../application/clinic/dto/create-clinic.dto';
import { ClinicService } from '../../../../application/clinic/services/clinic.service';

@Controller('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Post()
  async createClinic(@Body() createClinicDto: CreateClinicDto): Promise<void> {
    await this.clinicService.createClinic(createClinicDto);
  }
}
