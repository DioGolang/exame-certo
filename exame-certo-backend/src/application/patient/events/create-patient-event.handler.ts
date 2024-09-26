import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatePatientEvent } from './create-patient.event';
import { Inject } from '@nestjs/common';
import { PatientQueryRepository } from '../../../domain/repositories/patient-query.repository';
import { plainToClass } from 'class-transformer';
import { Patient } from '../../../infra/persistence/mongodb/schemas/patient.schema';

@EventsHandler(CreatePatientEvent)
export class CreatePatientEventHandler
  implements IEventHandler<CreatePatientEvent>
{
  constructor(
    @Inject('PatientQueryRepository')
    private readonly patientMongoRepository: PatientQueryRepository,
  ) {}

  async handle(event: CreatePatientEvent): Promise<void> {
    console.log('CreateDoctorEvent', event);
    const patientSchema = plainToClass(Patient, event.createPatientEventDto);
    await this.patientMongoRepository.save(patientSchema);
  }
}
