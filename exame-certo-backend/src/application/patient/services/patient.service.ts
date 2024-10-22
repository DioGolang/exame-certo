import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterPatientCommand } from '../commands/register-patient.command';
import { GetPatientQuery } from '../queries/get-patient.query';
import { RegisterPatientDto } from '../dto/register-patient.dto';
import { PatientMapper } from '../mappers/patient.mapper';

@Injectable()
export class PatientService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly patientMapper: PatientMapper,
  ) {}

  async createPatient(patient: RegisterPatientDto) {
    console.log(patient);
    await this.commandBus.execute(new RegisterPatientCommand(patient));
  }

  async getPatient(id: string) {
    try {
      const patientSchema = await this.queryBus.execute(
        new GetPatientQuery(id),
      );
      return this.patientMapper.documentForDomain(patientSchema);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error fetching patient');
    }
  }
}
