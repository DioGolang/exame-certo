import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterPatientCommand } from '../commands/register-patient.command';
import { GetPatientQuery } from '../queries/get-patient.query';
import { RegisterPatientDto } from '../dto/register-patient.dto';
import { Mapper } from '../../interfaces/mapper.interface';
import { Patient } from '../../../domain/entities/patient.entity';
import { PatientEntity } from '../../../infra/persistence/postgres/entities/patient.entity';
import { Patient as PatientDocument } from '../../../infra/persistence/mongodb/schemas/patient.schema';
import { RegisteredPatientEventDto } from '../dto/registered-patient-event.dto';

@Injectable()
export class PatientService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject('Mapper')
    private readonly patientMapper: Mapper<
      Patient,
      PatientEntity,
      PatientDocument,
      RegisteredPatientEventDto
    >,
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
