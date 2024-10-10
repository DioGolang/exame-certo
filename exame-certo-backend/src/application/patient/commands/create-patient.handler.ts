import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreatePatientCommand } from './create-patient.command';
import { Inject } from '@nestjs/common';
import { PatientCommandRepository } from '../../../domain/repositories/patient-command.repository';
import { CreatePatientEvent } from '../events/create-patient.event';
import { PatientMapper } from '../mappers/patient.mapper';
import { PatientDomainService } from '../../../domain/services/patient/patient-domain.service';
import { Patient } from '../../../domain/entities/patient.entity';
import { InvalidPatientException } from '../../../domain/exceptions/invalid-patient.exception';

@CommandHandler(CreatePatientCommand)
export class CreatePatientHandler
  implements ICommandHandler<CreatePatientCommand>
{
  constructor(
    @Inject('PatientCommandRepository')
    private readonly patientRepository: PatientCommandRepository,
    private readonly patientDomainService: PatientDomainService,
    private readonly eventBus: EventBus,
    private readonly patientMapper: PatientMapper,
  ) {}

  async execute(command: CreatePatientCommand): Promise<void> {
    try {
      const patient = await this.buildPatient(command);
      await this.savePatient(patient);
      await this.publishPatientCreatedEvent(patient);
    } catch (error) {
      throw new InvalidPatientException(
        'Failed to create patient: ' + error.message,
      );
    }
  }

  private async buildPatient(command: CreatePatientCommand): Promise<Patient> {
    return this.patientDomainService.createPatient(command);
  }
  private async savePatient(patient: Patient): Promise<void> {
    const patientEntity = this.patientMapper.toCreatePatientEventDto(patient);
    await this.patientRepository.save(patientEntity);
  }

  private async publishPatientCreatedEvent(patient: Patient): Promise<void> {
    const event = new CreatePatientEvent(
      this.patientMapper.toCreatePatientEventDto(patient),
    );
    this.eventBus.publish(event);
  }
}
