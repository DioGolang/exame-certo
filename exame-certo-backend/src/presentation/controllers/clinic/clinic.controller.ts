import { Body, Controller, Post } from '@nestjs/common';
import { CreateClinicDto } from '../../../application/dtos/create-clinic.dto';
import { ClinicService } from '../../../application/services/clinic.service';

@Controller('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Post()
  async createClinic(@Body() createClinicDto: CreateClinicDto): Promise<void> {
    await this.clinicService.createClinic(createClinicDto);
  }
}
