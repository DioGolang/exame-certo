import { Body, Controller, Post } from '@nestjs/common';
import { CreatePatientDto } from '../../../../application/patient/dto/create-patient.dto';
import { PatientService } from '../../../../application/patient/services/patient.service';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  async createPatient(@Body() patient: CreatePatientDto): Promise<void> {
    await this.patientService.createPatient(patient);
  }

  // @Get()
  // async findAll(): Promise<Patient[]> {
  //   return this.patientService.findAll();
  // }
  //
  // @Get(':id')
  // async findById(@Param('id') id: string): Promise<Patient> {
  //   return this.patientService.findById(id);
  // }
}
