import { Injectable } from '@nestjs/common';
import { CreateClinicDto } from '../dto/create-clinic.dto';

@Injectable()
export class ClinicService {
  async createClinic(createClinicDto: CreateClinicDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
