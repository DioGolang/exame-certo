import { Inject, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { BuilderFactory } from '../../../domain/builders/builder.factory';
import { CreatePatientCommand } from '../commands/create-patient.command';
import { GetPatientQuery } from '../queries/get-patient.query';
import { CreatePatientDto } from '../dto/create-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject('BuilderFactory') private readonly patientBuilder: BuilderFactory,
  ) {}

  async createPatient(patient: CreatePatientDto) {
    await this.commandBus.execute(new CreatePatientCommand(patient));
  }

  async getPatient(id: string) {
    const patientSchema = await this.queryBus.execute(new GetPatientQuery(id));
    const builderPatient = await this.patientBuilder.createPatientBuilder(
      id,
      patientSchema.password,
    );
    const patient = await builderPatient
      .withName(patientSchema.name)
      .withEmail(patientSchema.email)
      .withAddress(patientSchema.address)
      .withContactInfo(patientSchema.contactInfo)
      .build();
    return patient;
  }
}
