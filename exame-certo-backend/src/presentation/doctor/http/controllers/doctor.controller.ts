import { Body, Controller, Post } from '@nestjs/common';
import { DoctorService } from '../../../../application/doctor/services/doctor.service';
import { CreateDoctorDto } from '../../../../application/doctor/dto/create-doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  async createClinic(@Body() createDoctorDto: CreateDoctorDto): Promise<void> {
    await this.doctorService.createDoctor(createDoctorDto);
  }
}
