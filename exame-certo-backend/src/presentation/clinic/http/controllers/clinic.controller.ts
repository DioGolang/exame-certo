import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateClinicDto } from '../../../../application/clinic/dto/create-clinic.dto';
import { ClinicService } from '../../../../application/clinic/services/clinic.service';
import { Clinic } from '../../../../domain/entities/clinic.entity';

@Controller('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Post()
  async createClinic(@Body() createClinicDto: CreateClinicDto): Promise<void> {
    await this.clinicService.createClinic(createClinicDto);
  }

  @Get(':id')
  async getClinic(@Param('id') clinicId: string): Promise<Clinic | null> {
    return this.clinicService.getClinic(clinicId);
  }
}
