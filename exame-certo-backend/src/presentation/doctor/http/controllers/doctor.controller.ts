import { CreateDoctorDto } from '../../../../application/dtos/create-doctor.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { DoctorService } from '../../../../application/doctor/services/doctor.service';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  async createClinic(@Body() createDoctorDto: CreateDoctorDto): Promise<void> {
    // await this.doctorService.createClinic(createDoctorDto);
  }
}
